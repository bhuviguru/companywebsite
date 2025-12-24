import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './About.css';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    return (
        <section className="about section" id="about" ref={ref}>
            <div className="container">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {/* Section Header */}
                    <motion.div className="section-header" variants={itemVariants}>
                        <h2 className="section-title">
                            Who <span className="gradient-text">We Are</span>
                        </h2>
                        <p className="section-description">
                            Building the future through research, innovation, and execution
                        </p>
                    </motion.div>

                    {/* About Content */}
                    <motion.div className="about-content" variants={itemVariants}>
                        <div className="glass-card about-intro">
                            <div className="card-icon">💡</div>
                            <h3>Vyphera Groups R&D Pvt.Ltd</h3>
                            <p>
                                A technology and innovation-focused organization operating at the intersection of research, development, and real-world problem solving. Our objective is to transform ideas into scalable, industry-ready digital products through continuous learning, experimentation, and execution.
                            </p>
                        </div>
                    </motion.div>

                    {/* Mission & Vision */}
                    <motion.div className="mission-vision grid-2" variants={itemVariants}>
                        <div className="glass-card card-hover">
                            <div className="card-header">
                                <div className="card-icon gradient-bg-primary">🚀</div>
                                <h3>Our Mission</h3>
                            </div>
                            <p>
                                To design and deliver reliable, efficient, and innovative technology solutions that create meaningful value for industries, students, and society — driven by research, curiosity, and execution.
                            </p>
                        </div>

                        <div className="glass-card card-hover">
                            <div className="card-header">
                                <div className="card-icon gradient-bg-secondary">📈</div>
                                <h3>Our Vision</h3>
                            </div>
                            <p>
                                To evolve as a trusted R&D-oriented startup that bridges the gap between academic learning and industry-grade technology, while fostering a strong culture of innovation and problem-solving.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
