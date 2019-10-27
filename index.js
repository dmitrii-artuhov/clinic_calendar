const express = require('express');
const app = express();
const config = require('./config/config.json');
const mongoose = require('mongoose');
// Routes
const register = require('./routes/api/register');
const login = require('./routes/api/login');
const users = require('./routes/api/users');
const tokens = require('./routes/api/tokens');
const verification = require('./routes/api/verification');
const resetPassword = require('./routes/api/resetPassword');

// middleware
app.use(express.json());

// Connect to a MongoDB
const MongoURI = config.MongoURI;

mongoose.set('useCreateIndex', true);
mongoose.connect(MongoURI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true  })
	.then(() => {
		console.log('Connected to MongoDB...');
	})
	.catch((err) => {
		console.error('Enable to connect to MongoDB', err);
	});

// Routes
app.use('/api/users', register);
app.use('/api/users', login);
app.use('/api/users', resetPassword);
app.use('/api/users', users);
app.use('/api/users', tokens);
app.use('/api/users', verification);

// Starting server
const PORT = process.env.PORT || config.PORT;

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
