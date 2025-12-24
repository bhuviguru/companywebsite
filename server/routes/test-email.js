const express = require('express');
const router = express.Router();
const transporter = require('../config/email');

// Test endpoint to verify Gmail SMTP is working
router.get('/', async (req, res) => {
    console.log('\n🧪 Testing Gmail SMTP...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to yourself
            subject: '✅ Gmail SMTP Test - ' + new Date().toLocaleString(),
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2 style="color: #4CAF50;">✅ Gmail SMTP Working!</h2>
                    <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
                    <p><strong>From:</strong> ${process.env.EMAIL_USER}</p>
                    <p><strong>Status:</strong> App Password authentication successful</p>
                    <hr>
                    <p style="color: #666;">If you received this email, your Gmail SMTP configuration is correct!</p>
                </div>
            `,
        };

        console.log('📤 Sending test email to:', process.env.EMAIL_USER);

        const info = await transporter.sendMail(mailOptions);

        console.log('✅ EMAIL SENT SUCCESSFULLY!');
        console.log('   Message ID:', info.messageId);
        console.log('   Response:', info.response);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        res.json({
            success: true,
            message: 'Email sent successfully! Check your inbox.',
            details: {
                messageId: info.messageId,
                response: info.response,
                to: process.env.EMAIL_USER,
                timestamp: new Date().toISOString(),
            },
        });

    } catch (error) {
        console.error('❌ EMAIL SEND FAILED!');
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('Error Code:', error.code);
        console.error('Error Message:', error.message);
        console.error('');

        if (error.code === 'EAUTH' || error.responseCode === 535) {
            console.error('🔴 AUTHENTICATION ERROR');
            console.error('   Gmail rejected your App Password');
            console.error('   → App Password is WRONG or EXPIRED');
            console.error('   → Generate new one at: https://myaccount.google.com/apppasswords');
        } else if (error.code === 'EENVELOPE') {
            console.error('🔴 EMAIL ADDRESS ERROR');
            console.error('   Check EMAIL_USER in .env file');
        } else {
            console.error('🔴 UNKNOWN ERROR');
            console.error('   Full error:', error);
        }

        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        res.status(500).json({
            success: false,
            error: error.message,
            code: error.code,
            diagnosis: getDiagnosis(error),
        });
    }
});

// Helper function to diagnose the error
function getDiagnosis(error) {
    if (error.code === 'EAUTH' || error.responseCode === 535) {
        return {
            issue: 'Gmail App Password Authentication Failed',
            reason: 'Google is blocking the login',
            solution: [
                '1. Go to https://myaccount.google.com/apppasswords',
                '2. Sign in with ' + process.env.EMAIL_USER,
                '3. Generate NEW App Password',
                '4. Update EMAIL_PASS in .env file (remove spaces)',
                '5. Restart server',
            ],
            status: 'CODE IS CORRECT - GOOGLE IS BLOCKING',
        };
    } else if (error.code === 'ECONNECTION') {
        return {
            issue: 'Cannot connect to Gmail SMTP server',
            reason: 'Network or firewall issue',
            solution: ['Check internet connection', 'Check firewall settings'],
        };
    } else {
        return {
            issue: 'Unknown error',
            reason: error.message,
            solution: ['Check server logs for details'],
        };
    }
}

module.exports = router;
