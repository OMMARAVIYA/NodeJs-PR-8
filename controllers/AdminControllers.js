const UserTbl = require('../models/UserTbl');

const nodemailer = require('nodemailer');

const index = (req, res) => {
    if (res.locals.users) {
        return res.redirect('/dashboard')
    }
    return res.render('login');
}

const register = (req, res) => {
    return res.render('register');
}

const RegisterData = async (req, res) => {
    try {
        const { name, email, password, cpassword } = req.body;
        if (!name || !email || !password || !cpassword) {
            req.flash('danger', 'Please Fill All the Data')
            console.log("Please Fill All the Data");
            return res.redirect('back');
        }
        else {
            if (password == cpassword) {
                let userdata = await UserTbl.create({
                    name: name,
                    email: email,
                    password: password
                })
                if (userdata) {
                    console.log("User Successfully Registered");
                    return res.redirect('/')
                }
                else {
                    req.flash('danger', 'Something Got Wrong! Please Try Again.')
                    console.log("Something Got Wrong! Please Try Again.");
                    return res.redirect('back')
                }
            }
            else {
                req.flash('danger', 'Password Not Match')
                console.log("Password Not Match");
                return res.redirect('back');
            }
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const UserLogin = (req, res) => {
    return res.redirect('/dashboard');
}

const dashboard = (req, res) => {
    return res.render('dashboard');
}

const forgot = (req, res) => {
    return res.render('forgotpassword');
}

const ForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        let useremail = req.body.email

        let checkemail = await UserTbl.findOne({ email: email })
        if (checkemail) {

            // Create a transporter using your email service provider details
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'orm25112004@gmail.com',
                    pass: 'crmdpyzreqpdceew'
                }
            });

            // Generate a random OTP
            const generateOTP = () => {
                const digits = '0123456789';
                let OTP = '';
                for (let i = 0; i < 6; i++) {
                    OTP += digits[Math.floor(Math.random() * 10)];
                }
                return OTP;
            };

            // Send OTP via email
            const sendOTP = (email, otp) => {


                const mailOptions = {
                    from: 'orm25112004@gmail.com',
                    to: useremail,
                    subject: 'One-Time Password (OTP) Verification',
                    text: `Your OTP is: ${otp}`
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('Error sending OTP:', error);
                    } else {
                        console.log('OTP sent successfully.');
                        let obj = {
                            otp: otp,
                            email: useremail
                        }
                        res.cookie('userotp', obj);
                        return res.redirect('/otp')
                    }
                });
            };

            // Example usage
            const email = useremail;
            const otp = generateOTP();
            sendOTP(email, otp);
        }
        else {
            req.flash('danger', "Mail Not found")
            console.log("Mail Not found");
            return res.redirect('back')
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const OTP = (req, res) => {
    return res.render('otp');
}

const EnterOTp = (req, res) => {
    if (req.cookies.userotp.otp == req.body.otp) {
        return res.redirect('NewpasswordPage')
    }
    else {
        req.flash('danger', "Otp Is invalid")
        return res.redirect('back')
    }
}

const NewpasswordPage = (req, res) => {
    return res.render('UserNewpassword');
}

const UpdatePassword = async (req, res) => {
    try {
        const { password, cpassword } = req.body;
        if (password != cpassword) {
            req.flash('danger', "Both Password Are Not Match");
            return res.redirect('back');
        }
        else {
            let email = req.cookies.userotp.email
            let changepassword = await UserTbl.findOneAndUpdate({ email }, {
                password: password
            })
            if (changepassword) {
                res.clearCookie('userotp')
                return res.redirect('/')
            } else {
                req.flash('danger', "Password not Update");
                console.log("Password not Update");
                return res.redirect('back')
            }
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    index,
    register,
    RegisterData,
    UserLogin,
    dashboard,
    forgot,
    ForgotPassword,
    OTP,
    EnterOTp,
    NewpasswordPage,
    UpdatePassword

}