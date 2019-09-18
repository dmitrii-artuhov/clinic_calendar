const express = require('express');
const app = express();
const config = require('./config/config.json');

// middleware
app.use(express.json());

const PORT = process.env.PORT || config.PORT;

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});