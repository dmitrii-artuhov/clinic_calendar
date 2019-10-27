// models
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');

module.exports = (req, res, next) => {
	const { refreshToken } = req.body;

	RefreshToken.findOne({ refreshToken })
		.then((token) => {
			User.findOne({ _id: token.userId })
				.select('-password')
				.then((user) => {
					req.user = user;
					next();
				})
				.catch((err) => {
					res.status(400).json({ msg: 'Invalid refresh token' });
					console.error(err);
				});
		})
		.catch((err) => {
			res.status(500).json({ msg: 'Invalid refresh token' });
			console.error(err);
		});
}