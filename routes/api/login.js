const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');
const uuid = require('uuid/v1');
const nodemailer = require('nodemailer');
// models
const User = require('../../models/User');
const RefreshToken = require('../../models/RefreshToken');
const VerificationToken = require('../../models/VerificationToken');


router.post('/login', (req, res) => {
	const { email, password } = req.body;

	if(!email || !password) {
		return res.status(400).json({ msg: 'Enter all fields, please' });
	}

	User.findOne({ email })
		.then((user) => {
			if(!user.isVerified) {
				const verificationToken = new VerificationToken({
					token: user._id + uuid(),
					userId: user._id
				});
				
				verificationToken.save()
					.then((token) => {
						console.log('Аккаунт пользователя не подвержден, отправлен еще один email');
						verificationSend(res, user.email, token.token);
					})
					.catch((err) => {
						console.log(err);
						res.status(500).json({ msg: 'Не удалось отправить email c кодом подверждения' });
					})

				return res.status(400).json({ msg: 'Аккаунт пользователя не подвержден, отправлен еще один email' });
			}
			
			bcrypt.compare(password, user.password, (err, isMatch) => {
				if(err) console.error(err);

				if(isMatch) {		
					// Clear out password field from token
					const returnedUser = {
						...user._doc
					}
					delete returnedUser.password;		

					// finds an existing refresh token for this user
					RefreshToken.findOne({ userId: user._id })
						.then((token) => {
							const accessToken = jwt.sign({ user: returnedUser }, config.jwtSecret, { expiresIn: config.jwtExpiration });

							res.json({
								accessToken,
								expiresAt: Date.now() + config.jwtExpiration,
								refreshToken: token.refreshToken,
								user
							});
						})
						.catch((err) => {
							res.status(500).json({ msg: 'Login fail' });
							console.error(err);
						});
				} else {
					res.status(400).json({ msg: 'Введены неверные данные' });
				}
			});
		})
		.catch((err) => {
			res.status(404).json({ msg: 'Пользователь не найден' });
			console.log(err);
		});
});


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
		subject: 'Подверждение аккаунта', // Subject line
		text: `Здравствуйте,\nподтвердите свой аккаунт, перейдя по ссылке: \nhttp:\/\/localhost:3000\/verify\/${verificatinToken}`
	};

	await transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			console.log(err);
		}
	});
}


module.exports = router;