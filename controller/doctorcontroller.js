const Doctor = require('../model/doctormodel');

var nodemailer = require('nodemailer');
// const storage = require('node-persist');

// storage.init();
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cdmi.design3@gmail.com',
        pass: 'oovc jkmh xhai mqtp'
    }
});

exports.InsertDoctor = async (req, res) => {
    try {

        const min = 100000;
        const max = 999999;
        const OTP = Math.floor(Math.random() * (max - min + 1)) + min;

        var mailOptions = {
            from: 'demi.design3@gmail.com',
            to: req.body.email,
            subject: 'Dear Doctor Your OTP Is.',
            text: 'Your OTP is : ' + OTP
        };

        transporter.sendMail(mailOptions, async function (error, info) {
            if (error) {
                console.log(error);
            } else {
                // await storage.setItem('UserData', req.body);
                // await storage.setItem('otp', OTP);

                var newdoctor = {
                    doctorname: req.body.doctorname,
                    email: req.body.email,
                    password: req.body.password,
                    gender: req.body.gender,
                    mobile: req.body.mobile,
                    otp: OTP
                }

                // var newdoctor = new Doctor(req.body);
                await Doctor.create(newdoctor);

                res.status(200).json({
                    status: "OTP Send successfully"
                })
            }
        });


    } catch (error) {
        res.status(200).json({
            status: error.message
        })
    }
}

exports.CheckOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Step 1: Find doctor by email
        const doctor = await Doctor.findOne({ email });

        if (!doctor) {
            res.status(404).json({ error: 'Doctor not found' });
        }

        // Step 2: Check OTP
        if (doctor.otp !== otp) {
            res.status(400).json({ error: 'Invalid OTP' });
        }

        // Step 3: Update doctor data after OTP verification
        const updatedDoctor = await Doctor.updateOne(
            { email: email },
            {
                $set: {
                    otp: null,            // Clear OTP
                    verified: true,       // Mark as verified (optional field)
                    isActive: true        // Any other flag you need
                }
            }
        );

        res.status(200).json({
            message: 'OTP verified successfully. Account updated.',
            updatedDoctor
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.DoctorLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // 1. Check if doctor exists
        const doctor = await Doctor.findOne({ email });

        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        // 2. Check password
        if (password == doctor.password) {
            if(doctor.isActive == true)
            {
                res.status(200).json({
                    status: 'Login successful',
                    doctor
                });
            }
            else{
                res.status(200).json({
                    status: 'Account not verified. Contact Administrator.',
                });
            }
        }
        else{
            res.status(200).json({ error: error.message });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}