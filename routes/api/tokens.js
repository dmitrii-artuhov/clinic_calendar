const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');
// middlewrae
const validateRefreshToken = require('../../middleware/refreshTokenValidate');

// Refresh an access token
router.post('/token', validateRefreshToken, (req, res) => {
	const newAccessToken = jwt.sign({ user: req.user }, config.jwtSecret, { expiresIn: config.jwtExpiration });
	const expiresAt = Date.now() + (config.jwtExpiration * 1000);

	res.json({
		accessToken: newAccessToken,
		expiresAt
	 });
});


module.exports = router;