const nodemailer = require('nodemailer');

// Gmail SMTP Transporter with App Password
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Verify SMTP connection on startup
transporter.verify((error, success) => {
    if (error) {
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('❌ Gmail SMTP Connection FAILED');
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('Error Code:', error.code);
        console.error('Error Message:', error.message);
        console.error('');

        if (error.code === 'EAUTH' || error.responseCode === 535) {
            console.error('🔴 AUTHENTICATION FAILED');
            console.error('   Reason: Gmail rejected your App Password');
            console.error('');
            console.error('   Possible causes:');
            console.error('   1. App Password is incorrect or expired');
            console.error('   2. 2-Step Verification is NOT enabled');
            console.error('   3. App Password was revoked');
            console.error('   4. Wrong Gmail account');
            console.error('');
            console.error('   ✅ Solution:');
            console.error('   → Go to: https://myaccount.google.com/apppasswords');
            console.error('   → Generate NEW App Password');
            console.error('   → Update EMAIL_PASS in .env file');
            console.error('   → Restart server');
        } else if (error.code === 'ECONNECTION') {
            console.error('🔴 CONNECTION FAILED');
            console.error('   Cannot reach Gmail SMTP server');
            console.error('   Check your internet connection');
        } else {
            console.error('🔴 UNKNOWN ERROR');
            console.error('   Full error:', error);
        }

        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    } else {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅ Gmail SMTP Connection SUCCESS');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📧 Email:', process.env.EMAIL_USER);
        console.log('🔐 App Password: ****' + process.env.EMAIL_PASS?.slice(-4));
        console.log('🚀 Ready to send emails!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }
});

module.exports = transporter;
