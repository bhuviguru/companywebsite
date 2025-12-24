import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import axios from 'axios';
import { HiMail } from 'react-icons/hi';
import { FaLinkedin, FaGithub, FaXTwitter } from 'react-icons/fa6';
import './Contact.css';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [status, setStatus] = useState({
        submitting: false,
        submitted: false,
        error: null,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ submitting: true, submitted: false, error: null });

        try {
            await axios.post('http://localhost:5000/api/contact', formData);
            setStatus({ submitting: false, submitted: true, error: null });
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => {
                setStatus({ submitting: false, submitted: false, error: null });
            }, 5000);
        } catch (error) {
            setStatus({
                submitting: false,
                submitted: false,
                error: 'Failed to send message. Please try again.',
            });
        }
    };

    const socialLinks = [
        { icon: HiMail, label: 'Email', href: 'mailto:vypheragrups2025@gmail.com' },
        { icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/vyphera-groups' },
        { icon: FaGithub, label: 'GitHub', href: 'https://github.com/vypheragroups-pvt' },
        { icon: FaXTwitter, label: 'X (Twitter)', href: '#' },
    ];

    return (
        <section className="contact section" id="contact" ref={ref}>
            <div className="container">
                {/* Section Header */}
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">Get In Touch</h2>
                    <p className="section-description">
                        If you require consultancy services, please fill out this form.<br />
                        All the information you provide will be securely sent to Vyphera Groups for further communication and assistance.
                    </p>
                </motion.div>

                <div className="contact-content">
                    {/* Contact Form */}
                    <motion.div
                        className="contact-form-wrapper"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <form className="contact-form glass-card" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Name"
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="your.email@example.com"
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="What's this about?"
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="Tell us more..."
                                    rows="5"
                                    className="form-input form-textarea"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-lg"
                                disabled={status.submitting}
                            >
                                {status.submitting ? 'Sending...' : 'Send Message'}
                                <span>→</span>
                            </button>

                            {/* Status Messages */}
                            {status.submitted && (
                                <motion.div
                                    className="status-message success"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    ✓ Message sent successfully!
                                </motion.div>
                            )}

                            {status.error && (
                                <motion.div
                                    className="status-message error"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    ✗ {status.error}
                                </motion.div>
                            )}
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="glass-card info-card">
                            <h3>Connect With Us</h3>
                            <p>
                                Stay connected for updates on our journey, projects, and
                                upcoming innovations.
                            </p>

                            <div className="social-links">
                                {socialLinks.map((link, index) => (
                                    <motion.a
                                        key={index}
                                        href={link.href}
                                        className="social-link"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        title={link.label}
                                    >
                                        <span className="social-icon"><link.icon /></span>
                                        <span className="social-label">{link.label}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card info-card">
                            <h3>Vyphera Groups R&D</h3>
                            <p className="tagline">
                                <span className="gradient-text">Building, Learning, Evolving</span>
                                <br />
                                One step at a time.
                            </p>
                            <div className="info-detail">
                                <span className="info-icon">🚀</span>
                                <span>Research-Driven Innovation</span>
                            </div>
                            <div className="info-detail">
                                <span className="info-icon">💡</span>
                                <span>Future-Ready Solutions</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
