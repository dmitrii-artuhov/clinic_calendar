const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResetTokenSchema = new Schema({
	token: {
		type: String,
		required: true,
		unique: true
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
		expires: 60 // 1 hour
	},
	userId: {
		type: String,
		required: true
	}
});

module.exports = ResetToken = mongoose.model('ResetToken', ResetTokenSchema);