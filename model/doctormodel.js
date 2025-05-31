const mongoose = require('mongoose');

const doctorschema = new mongoose.Schema({
    doctorname: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    gender: {type: String, require: true},
    mobile: {type: Number, require: true},
    otp: {type: Number,},
    verified: {type: Boolean, default: false},
    speciality: {type: String , default:''},
    subspeciality: {type: String , default:''},
    degree_no: {type: String , default:''},
    qualification: {type: String , default:''},
    experience: {type: String , default:''},
    hospital_name: {type: String , default:''},
    hospital_address: {type: String , default:''},
    country: {type: String , default:''},
    state: {type: String , default:''},
    city: {type: String , default:''},
    profile: {type: String , default:''},
    ambulance_have: {type: String , default:''},
    isActive: {type: Boolean, default: false}
})

module.exports = mongoose.model('doctor',doctorschema);