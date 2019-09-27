const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
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
	role: 'patient'
}, { timestamps: true });

module.exports = Patient = mongoose.model('Patient', PatientSchema);