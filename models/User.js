const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	phone: {
		type: Number,
		required: true
	},
	isVerified: {
		type: Boolean,
		default: false
	}
}, { timestamps: true });

module.exports = User = mongoose.model('User', UserSchema);