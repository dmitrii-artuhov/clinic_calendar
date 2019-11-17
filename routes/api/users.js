const express = require('express');
const router = express.Router();
// models
const User = require('../../models/User');
// middleware
const checkAuth = require('../../middleware/checkAuth');


// Search for a user by email
router.post('/search', (req, res) => {
	const { email, role } = req.body;
	
	User.findOne({ email })
		.then((user) => {
			if(!user) {
				return res.json({ msg: 'Пользователь не найден' });
			}

			if(role == 'patient' && user.role != 'doctor') {
				return res.json({ msg: 'Не найдено ни одного врача с таким email' });
			}
			else if(role == 'doctor' && user.role != 'patient') {
				return res.json({ msg: 'Не найдено ни одного пациента с таким email' });
			}

			res.json({ user });
		})
		.catch((err) => {
			console.error(err);
			res.json({ msg: 'Пользователь не найден' });
		});
});

// add a new featured user to the requester's list
router.post('/addfeatured', (req, res) => {
	const { id, featuredId } = req.body; // id - requeter's id; feauturedId - id of a featured user

	if(id == featuredId) {
		return res.status(400).json({ msg: 'Нельзя добавить себя' });
	}

	User.findOne({ _id: id })
		.then((user) => {
			if (!user) {
				return res.status(404).json({ msg: 'Пользователь не найден' });
			}

			// flag for returning an error if equal featured id is found (cuz JS is dumb)
			let f = 1; 
			user.featuredUsers.forEach((item) => {
				if(item == featuredId) {
					f = 0;
				}
			});

			if(!f) {
				return res.status(400).json({ msg: 'Пользователь уже добавлен' });
			}

			user.featuredUsers.push(featuredId);

			user.save()
				.then(() => {
					res.json({ msg: 'Пользователь успешно добавлен' });
				})
				.catch((err) => {
					res.status(500).json({ msg: 'Failed while saving' });
					console.error(err);
				})
		})
		.catch((err) => {
			console.error(err);
			res.status(400).json({ msg: 'Invalid request' });
		});
});

router.delete('/deletefeatured', (req, res) => {
	const { id, featuredId } = req.body;

	User.findOne({ _id: id })
		.then((user) => {
			if(!user) {
				return res.status(404).json({ msg: 'Пользователь не найден' });
			}

			user.featuredUsers.forEach((item, index) => {
				if(item == featuredId) {
					user.featuredUsers.splice(index, 1);
				}
			});

			user.save()
				.then(() => {
					res.json({ msg: 'Пользователь успешно удален', list: user.featuredUsers });
				})
				.catch((err) => {
					console.error(err);
					res.status(400).json({ msg: 'Невозможно удалить пользователя, попробуйте еще раз' });
				});
		})
		.catch((err) => {
			console.error(err);
			res.status(400).json({ msg: 'Invalid request' });
		});
});

// GET all featured users for reqiester
router.get('/listfeatured/:id', (req, res) => {
	const { id } = req.params;

	User.findOne({ _id: id })
		.populate('featuredUsers', '-password')
		.exec((err, user) => {
			if(err || !user) {
				console.error(err);
				return res.status(404).json({ msg: 'Пользователь не найден' });
			}

			res.json(user);
		});
});

// used with refresh tokens
router.get('/', checkAuth, (req, res) => {
	res.json(req.user);
});


// GET all users (for testing only)
router.get('/listusers', (req, res) => {
	User.find()
		.then((users) => {
			res.json(users);
		})
		.catch((err) => {
			res.status(400).json({ msg: 'Invalid request' })
			console.error(err);
		})
});


module.exports = router;