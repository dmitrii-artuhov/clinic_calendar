const express = require('express');
const router = express.Router();
// medels
const VerificationToken = require('../../models/VerificationToken');
const User = require('../../models/User');


router.post('/verify', (req, res) => {
	const { token } = req.body;
	
	if (token == '') {
		return res.status(400).json({ msg: 'No verification token provided' });
	}

	VerificationToken.findOne({ token: token })
		.then((token) => {
			if (!token) {
				return res.status(400).json({ msg: 'Token not found' });
			}

			User.findOne({ _id: token.userId })
				.then((user) => {
					if (!user) {
						return res.status(400).json({ msg: 'User matching verification token not found' });
					}

					// Verify and save updated user
					user.isVerified = true;
					user.save()
						.then(() => {
							res.json({ msg: 'Your account is successfuly verified, procced to the homepage to login' });
						})
						.catch((err) => {
							console.error(err);
							res.status(500).json({ msg: 'Failed while verification' });
						});
				})
				.catch((err) => {
					console.error(err);
					res.status(500).json({ msg: 'User matching verification token not found' });
				});
		})
		.catch((err) => {
			console.erorr(err);
			res.status(500).json({ msg: 'Invalid verification token provided' });
		})
});

module.exports = router;