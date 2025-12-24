const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Validation rules
const contactValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ max: 100 })
        .withMessage('Name cannot exceed 100 characters'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('subject')
        .trim()
        .notEmpty()
        .withMessage('Subject is required')
        .isLength({ max: 200 })
        .withMessage('Subject cannot exceed 200 characters'),
    body('message')
        .trim()
        .notEmpty()
        .withMessage('Message is required')
        .isLength({ max: 2000 })
        .withMessage('Message cannot exceed 2000 characters'),
];

// POST /api/contact - Submit contact form
router.post('/', contactValidation, async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }

        // Create new contact
        const contact = new Contact({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message,
        });

        // Save to database
        await contact.save();

        // Send email notification
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // use SSL
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_USER || 'vypheragrups2025@gmail.com',
                to: 'vypheragrups2025@gmail.com',
                subject: `New Contact Form: ${req.body.subject}`,
                html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    </head>
                    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
                        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 40px 20px;">
                            <tr>
                                <td align="center">
                                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
                                        <!-- Header -->
                                        <tr>
                                            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
                                                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">
                                                    📧 New Contact Form Submission
                                                </h1>
                                            </td>
                                        </tr>
                                        
                                        <!-- Content -->
                                        <tr>
                                            <td style="padding: 40px 30px;">
                                                <!-- Name -->
                                                <div style="margin-bottom: 25px;">
                                                    <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                                        Name
                                                    </p>
                                                    <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 500; padding: 12px 16px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #667eea;">
                                                        ${req.body.name}
                                                    </p>
                                                </div>
                                                
                                                <!-- Email -->
                                                <div style="margin-bottom: 25px;">
                                                    <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                                        Email
                                                    </p>
                                                    <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 500; padding: 12px 16px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #10b981;">
                                                        <a href="mailto:${req.body.email}" style="color: #10b981; text-decoration: none;">
                                                            ${req.body.email}
                                                        </a>
                                                    </p>
                                                </div>
                                                
                                                <!-- Subject -->
                                                <div style="margin-bottom: 25px;">
                                                    <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                                        Subject
                                                    </p>
                                                    <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 500; padding: 12px 16px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #f59e0b;">
                                                        ${req.body.subject}
                                                    </p>
                                                </div>
                                                
                                                <!-- Message -->
                                                <div style="margin-bottom: 25px;">
                                                    <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                                        Message
                                                    </p>
                                                    <div style="margin: 0; color: #1f2937; font-size: 15px; line-height: 1.6; padding: 16px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #3b82f6;">
                                                        ${req.body.message.replace(/\n/g, '<br>')}
                                                    </div>
                                                </div>
                                                
                                                <!-- Timestamp -->
                                                <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
                                                    <p style="margin: 0; color: #9ca3af; font-size: 13px; text-align: center;">
                                                        📅 Submitted on ${new Date().toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                        
                                        <!-- Footer -->
                                        <tr>
                                            <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                                                <p style="margin: 0; color: #6b7280; font-size: 13px;">
                                                    <strong style="color: #1f2937;">Vyphera Groups R&D Pvt. Ltd.</strong><br>
                                                    Building, Learning, Evolving - One step at a time
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </body>
                    </html>
                `,
            };

            await transporter.sendMail(mailOptions);
            console.log('✓ Email notification sent successfully');
        } catch (emailError) {
            console.error('✗ Email sending failed:', emailError.message);
            // Continue even if email fails - message is still saved in database
        }

        res.status(201).json({
            success: true,
            message: 'Message received successfully! We will get back to you soon.',
            data: {
                id: contact._id,
                name: contact.name,
                createdAt: contact.createdAt,
            },
        });
    } catch (error) {
        console.error('Contact submission error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save message. Please try again later.',
        });
    }
});

// GET /api/contact - Get all contacts (for admin use)
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find()
            .sort({ createdAt: -1 })
            .limit(100);

        res.json({
            success: true,
            count: contacts.length,
            data: contacts,
        });
    } catch (error) {
        console.error('Fetch contacts error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contacts',
        });
    }
});

module.exports = router;
