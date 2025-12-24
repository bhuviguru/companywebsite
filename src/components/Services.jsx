import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './Services.css';

const Services = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const services = [
        {
            icon: '💻',
            title: 'Software Research & Development',
            description: 'Building industry-grade software solutions through continuous research and development.',
            gradient: 'var(--gradient-primary)',
        },
        {
            icon: '🌐',
            title: 'Web & Application Development',
            description: 'Creating scalable web and mobile applications designed for performance and usability.',
            gradient: 'var(--gradient-secondary)',
        },
        {
            icon: '🤖',
            title: 'AI, Data Science & Intelligent Systems',
            description: 'Leveraging AI and data science to build intelligent, automated solutions.',
            gradient: 'var(--gradient-tertiary)',
        },
        {
            icon: '⚙️',
            title: 'Automation & Emerging Technologies',
            description: 'Implementing automation and emerging tech to streamline processes and enhance productivity.',
            gradient: 'var(--gradient-accent)',
        },
        {
            icon: '🔬',
            title: 'Product-based Innovation & Prototyping',
            description: 'From concept to prototype to production—building innovative digital products.',
            gradient: 'var(--gradient-aurora)',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    return (
        <section className="services section" id="services" ref={ref}>
            <div className="container">
                {/* Section Header */}
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">
                        Our <span className="gradient-text">Focus Domains</span>
                    </h2>
                    <p className="section-description">
                        Technology solutions across multiple cutting-edge domains
                    </p>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    className="services-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="glass-card service-card"
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Gradient Border Effect */}
                            <div
                                className="service-border"
                                style={{
                                    background: service.gradient,
                                }}
                            />

                            {/* Icon */}
                            <motion.div
                                className="service-icon"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                            >
                                {service.icon}
                            </motion.div>

                            {/* Content */}
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-description">{service.description}</p>

                            {/* Hover Glow */}
                            <div className="service-glow" style={{ background: service.gradient }} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
