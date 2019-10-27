const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('../../config/config.json');
const nodemailer = require('nodemailer');
const uuid = require('uuid/v1');
// models
const User = require('../../models/User');
const ResetToken = require('../../models/ResetToken');


router.post('/forgot', (req, res) => {
	const { email } = req.body;
	if(!email) {
		return res.status(400).json({ msg: 'email is required' });
	}

	User.findOne({ email })
		.then((user) => {
			if(!user) {
				return res.status(404).json({ msg: 'User not found' });
			}

			const resetToken = new ResetToken({
				userId: user._id,
				token: user._id + uuid()
			});

			resetToken.save()
				.then((token) => {
					resetSend(res, email, token.token);
				})
				.catch((err) => {
					console.log(err);
					res.status(500).json({ msg: 'Reseting Fail' });
				})
		})
		.catch((err) => {
			console.log(err);
			res.status(404).json({ msg: 'User not found' });
		});
});

router.post('/reset', (req, res) => {
	const { password, token } = req.body;
	if(!token) {
		return res.status(400).json({ msg: 'No token provided' });
	}

	ResetToken.findOne({ token })
		.then((token) => {
			User.findOne({ _id: token.userId })
				.then((user) => {
					if(!user) {
						return res.status(404).json({ msg: 'No matching user found' });
					}

					bcrypt.genSalt(10, (err, salt) => {
						if(err) {
							console.error('Salting fail: ', err);
							return res.status(400).json({ msg: 'Password reseting fail' });
						}
				
						bcrypt.hash(password, salt, (err, hash) => {
							if(err) {
								console.error('Hashing fail: ', err);
								return res.status(400).json({ msg: 'Password reseting fail' });
							}
		
							user.password = hash;
		
							user.save()
								.then(() => {
									token.remove()
										.then(() => {
											res.json({ msg: 'Password is changed, you better remember it this time...' });
										})
										.catch((err) => {
											console.log(err);
											res.status(500).json({ msg: 'Oops, something went wrong...' });
										})
								})
								.catch((err) => {
									console.error(err);
									res.status(500).json({ msg: 'Password reseting fail' });
								});
						});
					})
				})
				.catch((err) => {
					console.log(err);
					res.status(404).json({ msg: 'No matching user found' });
				});
		})
		.catch((err) => {
			console.log(err);
			res.status(404).json({ msg: 'No token found' });
		});

/*	User.findOne({ email })
		.then((user) => {
			if (!user) {
				return res.status(404).json({ msg: 'User not found' });
			}

			bcrypt.genSalt(10, (err, salt) => {
				if(err) {
					console.error('Salting fail: ', err);
					return res.status(400).json({ msg: 'Reseting Fail' });
				}
		
				bcrypt.hash(password, salt, (err, hash) => {
					if(err) {
						console.error('Hashing fail: ', err);
						return res.status(400).json({ msg: 'Reseting fail' });
					}

					user.password = hash;

					user.save()
						.then(() => {
							res.json({ msg: 'Password is changed, you better remember it this time...' });
						})
						.catch((err) => {
							console.error(err);
							res.status(500).json({ msg: 'Failed while password change' });
						});
				});
			})
		})
		.catch((err) => {
			console.error(err);
			res.status(404).json({ msg: 'User not found' });
		});*/
});


const resetSend = async (res, userEmail, resetToken) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: config.EMAIL_USER,
			pass: config.EMAIL_PASSWORD
		},
		tls: {
			rejectUnathorized: false
		}
	});

	const mailOptions = {
		from: '"ClinicCalendar DevTeam" <cliniccalendar2019@gmail.com>', // sender address
		to: userEmail, // list of receivers
		subject: 'Password Reset', // Subject line
		text: `Hello,\nPlease proceed to changing your password by clicking the link: http:\/\/localhost:3000/reset/${resetToken}
		\nIf you did not want to change your password, please check your accound in terms of hacking.
		`
	};

	await transporter.sendMail(mailOptions, (err, info) => {
		console.log(info);

		if (err) {
			console.error(err);
			return res.status(500).json({ msg: 'Could not send email for password changing, try again' });
		}
		res.json({ msg: `An email has been sent to ${userEmail}` });
	});
}

module.exports = router;