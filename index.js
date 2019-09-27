const express = require('express');
const app = express();
const config = require('./config/config.json');
const mongoose = require('mongoose');

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

// Starting server
const PORT = process.env.PORT || config.PORT;

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});