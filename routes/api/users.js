const express = require('express');
const router = express.Router();
// models
const User = require('../../models/User');
// middleware
const checkAuth = require('../../middleware/checkAuth');


// GET current user
router.get('/', checkAuth, (req, res) => {
	// User.find()
	// 	.sort({ date: -1 })
	// 	.select('-password')
	// 	.then((users) => {
	// 		res.json(users);
	// 	})
	// 	.catch((err) => {
	// 		res.status(404).json({ msg: 'Users not found' });
	// 		console.error(err);
	// 	});
	res.json(req.user);
});

module.exports = router;