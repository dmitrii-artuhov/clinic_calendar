const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const DoctorSchema = new Schema({
	role: {
		type: String,
		default: 'doctor'
	},
	featuredUsers: [{ type: Schema.Types.ObjectId, ref: 'Patient' }]
});

const Doctor = User.discriminator('Doctor', DoctorSchema);

module.exports = Doctor;