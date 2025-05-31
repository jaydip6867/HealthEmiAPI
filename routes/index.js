var express = require('express');
var router = express.Router();
var doctor = require('../controller/doctorcontroller');

/* GET home page. */

router.post('/registerdoctor',doctor.InsertDoctor);
router.post('/checkotp',doctor.CheckOTP);
router.post('/doctorlogin',doctor.DoctorLogin);



module.exports = router;
