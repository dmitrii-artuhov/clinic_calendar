const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RefreshTokenSchema = new Schema({
	refreshToken: {
		type: String,
		required: true,
		unique: true
	},
	userId: {
		type: String,
		required: true
	}
});

module.exports = RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);