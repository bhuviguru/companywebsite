import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

import './About.css';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section className="about section" id="about" ref={ref}>
            <div className="container">
                {/* Intro Section */}
                <motion.div
                    className="about-intro"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="card-icon">💡</div>
                    <h2 className="section-title">
                        Who <span className="gradient-text">We Are</span>
                    </h2>
                    <p className="section-description">
                        Building the future through research, innovation, and Automation
                    </p>

                    <h3>Vyphera Groups R&D Pvt.Ltd</h3>
                    <p>
                        A technology and innovation-focused organization operating at the intersection of research, development, and real-world problem solving. Our objective is to transform ideas into scalable, industry-ready digital products through continuous learning, experimentation, and Automation.
                    </p>
                </motion.div>

                {/* Mission & Vision Split Layout */}
                <div className="mission-vision-container">
                    {/* Vision Row - Text Left | Image Right */}
                    <motion.div
                        className="split-row"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="split-text">
                            <div className="card-header">
                                <h3 className="card-title">Our Vision</h3>
                            </div>
                            <p>
                                To build a globally impactful ecosystem where automation and research-driven innovation eliminate manual inefficiencies and empower students, farmers, and businesses across multiple domains.
                            </p>
                        </div>
                        <div className="split-image vision-visualization">
                            <div className="vision-core">
                                <div className="scanner-line"></div>
                                <div className="vision-eye">
                                    <div className="eye-pupil"></div>
                                </div>
                                <div className="vision-ring ring-outer"></div>
                                <div className="vision-ring ring-inner"></div>
                                <div className="core-particles"></div>
                            </div>
                            <div className="image-overlay gradient-secondary-overlay"></div>
                        </div>
                    </motion.div>

                    {/* Mission Row - Image Left | Text Right (Row Reverse) */}
                    <motion.div
                        className="split-row reverse"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="split-text">
                            <div className="card-header">
                                <h3 className="card-title">Our Mission</h3>
                            </div>
                            <p>
                                To design and deliver accurate, scalable, and AI-powered automation solutions that simplify complex processes, reduce manual effort, and create meaningful, real-world impact across education, agriculture, and business sectors.
                            </p>
                        </div>
                        <div className="split-image mission-visualization">
                            <div className="automation-core">
                                <div className="gear gear-large"></div>
                                <div className="gear gear-medium"></div>
                                <div className="gear gear-small"></div>
                                <div className="core-particles"></div>
                            </div>
                            <div className="image-overlay gradient-primary-overlay"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
