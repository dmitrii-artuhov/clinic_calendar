const config = require('../config/config');
const jwt = require('jsonwebtoken');


const checkAuth = (req, res, next) => {
	const token = req.header('x-auth-token');

	// Check for token
	if(!token) {
		return res.status(401).json({ msg: 'No token, action denied' });
	}

	try{
		// Verify token
		const decoded = jwt.verify(token, config.jwtSecret);
		req.user = decoded;
		next();

	}	catch(err) {
		res.status(401).json({ msg: 'Token is not valid' });
	}
	
}


module.exports = checkAuth;