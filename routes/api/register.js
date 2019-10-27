const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');
const uuid = require('uuid/v1');
const nodemailer = require('nodemailer');
// models
const User = require('../../models/User');
const Patient = require('../../models/Patient');
const Doctor = require('../../models/Doctor');
const RefreshToken = require('../../models/RefreshToken');
const VerificationToken = require('../../models/VerificationToken');

// POST a certain roled user
router.post('/register', (req, res) => {
	const { username, email, password, role, phone } = req.body;

	if(!email || !username || !password || !role || !phone) {
		return res.status(400).json({ msg: 'Enter all fields, please' });
	}
	
	if(role === 'patient') {
		User.findOne({ email })
			.then((user) => {
				if(user) {
					return res.status(400).json({ msg: 'User already exists' });
				}
				
				const newPatient = new Patient({
					username,
					email,
					password,
					phone,
					role
				});
				
				jwtRegistration(res, newPatient);
			})
			.catch((err) => {
				console.log('Query fail: ', err);
				res.status(500).json({ msg: 'Oops, something went wrong...' });
			});

	} else if(role === 'doctor') {
		User.findOne({ email })
			.then((user) => {
				if(user) {
					return res.status(400).json({ msg: 'User already exists' });
				}

				const { mark } = req.body;
				if(!mark) return res.status(400).json({ msg: 'Enter all fields, please' });

				const newDoctor = new Doctor({
					username,
					email,
					password,
					phone,
					role,
					mark
				});

				if(mark !== config.PASSWORD) return res.status(400).json({ msg: 'Invalid clinic password' });

				jwtRegistration(res, newDoctor);
			})
			.catch((err) => {
				console.error('Query fail: ', err);
				res.status(500).json({ msg: 'Oops, something went wrong...' });
			})

	} else {
		return res.status(400).json({ msg: 'Invalid user role provided' });
	}
});

// Save registered user and send verification email
const jwtRegistration = (res, model) => {
	bcrypt.genSalt(10, (err, salt) => {
		if(err) {
			console.error('Salting fail: ', err);
			return res.status(400).json({ msg: 'Register Fail' });
		}

		bcrypt.hash(model.password, salt, (err, hash) => {
			if(err) {
				console.error('Hashing fail: ', err);
				return res.status(400).json({ msg: 'Register fail' });
			}
			model.password = hash;

			model.save()
				.then((user) => {
					const refreshToken = user._id + uuid();
					// const returnedUser = {
					// 	...user._doc
					// }
					// // deleting user's password from the payload
					// delete returnedUser.password;

					// saving new refresh token model
					const Token = new RefreshToken({
						refreshToken,
						userId: user._id
					});

					Token.save()
						.then(() => {
							// save verification token for a certain user
							const verificationToken = new VerificationToken({
								token: user._id + uuid(),
								userId: user._id
							});
							
							verificationToken.save()
								.then((token) => {
									verificationSend(res, user.email, token.token);
								})
								.catch((err) => {
									console.log(err);
									res.status(500).json({ msg: 'Could not send verification email' });
								})
							// Issuing all token to user
							// const token = jwt.sign({ user: returnedUser	}, config.jwtSecret, { expiresIn: config.jwtExpiration },
							// 	(err, token) => {
							// 		if(err) throw err;
							// 		res.json({
							// 			accessToken: token,
							// 			expiresAt: Date.now() + config.jwtExpiration,
							// 			refreshToken: refreshToken.refreshToken,
							// 			user: {
							// 				...model._doc
							// 			}
							// 		});
							// 	}
							// );
						})
						.catch((err) => {
							res.status(500).json({ msg: 'Failed to store a refresh token' });
							console.log('JWT Refresh token saving fail: ', err);
						});
				})
				.catch((err) => {
					console.error('JWT signing fail: ', err);
					res.status(500).json({ msg: 'Failed while saving' });
				});
		});
	});
}

const verificationSend = async (res, userEmail, verificatinToken) => {
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
		subject: 'Account Verification', // Subject line
		text: `Hello,\nPlease verify your account by clicking the link: \nhttp:\/\/localhost:3000\/verify\/${verificatinToken}
		\nIf you have not created your account on our platform, please ignore this message.
		`
	};

	await transporter.sendMail(mailOptions, (err, info) => {
		console.log(info);

		if (err) {
			console.log(err);
			return res.status(500).json({ msg: 'Could not send verification email, try again' });
		}
		res.json({ msg: `A verification email has been sent to ${userEmail}` });
	});
}

module.exports = router;