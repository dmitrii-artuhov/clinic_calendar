const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const PatientSchema = new Schema({
	role: {
		type: String,
		default: 'patient'
	},
	featuredUsers: [{ type: Schema.Types.ObjectId, ref: 'Doctor' }]
});

const Patient = User.discriminator('Patient', PatientSchema);

module.exports = Patient;