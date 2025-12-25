import { motion } from 'framer-motion';
import { HiMail } from 'react-icons/hi';
import { FaLinkedin, FaGithub, FaXTwitter } from 'react-icons/fa6';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Contact', href: '#contact' },
    ];

    const domains = [
        'Software R&D',
        'Web Development',
        'AI & Data Science',
        'Automation',
        'Product Innovation',
    ];

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Brand Section */}
                    <div className="footer-section">
                        <div className="footer-logo">
                            <img src="/logo.png" alt="Vyphera Logo" className="footer-logo-img" />
                            <div className="footer-logo-text">
                                <span className="gradient-text">Vyphera</span>
                                <span className="logo-subtitle">R&D</span>
                            </div>
                        </div>
                        <p className="footer-tagline">
                            Driven by Curiosity, Built with Purpose.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul className="footer-links">
                            {quickLinks.map((link, index) => (
                                <motion.li key={index} whileHover={{ x: 5 }}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document
                                                .querySelector(link.href)
                                                ?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                    >
                                        {link.label}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Focus Domains */}
                    <div className="footer-section">
                        <h4 className="footer-heading">Focused Domains</h4>
                        <ul className="footer-list">
                            {domains.map((domain, index) => (
                                <li key={index}>{domain}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div className="footer-section">
                        <h4 className="footer-heading">Connect</h4>
                        <p className="footer-text">
                            Stay connected for updates on our journey, projects, and upcoming innovations.
                        </p>
                        <div className="footer-social">
                            <a href="mailto:vypheragrups2025@gmail.com" className="social-icon-link" aria-label="Email">
                                <HiMail />
                            </a>
                            <a href="https://www.linkedin.com/company/vyphera-groups" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn">
                                <FaLinkedin />
                            </a>
                            <a href="https://github.com/vypheragroups-pvt" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="GitHub">
                                <FaGithub />
                            </a>
                            <a href="https://x.com/VYPHERA_GROUPS_" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="X (Twitter)">
                                <FaXTwitter />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="footer-divider"></div>
                    <div className="footer-bottom-content">
                        <p className="footer-copyright">
                            © {currentYear} Vyphera Groups R&D Pvt.Ltd. All rights reserved.
                        </p>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
