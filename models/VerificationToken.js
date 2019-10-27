const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VerificationTokenSchema = new Schema({
	token: {
		type: String,
		required: true,
		unique: true
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
		expires: 43200 // 12 hours
	},
	userId: {
		type: String,
		required: true
	}
});

module.exports = VerificationToken = mongoose.model('VerificationToken', VerificationTokenSchema);