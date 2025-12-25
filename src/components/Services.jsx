import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaCloud } from 'react-icons/fa6';
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
            shadowColor: 'rgba(0, 240, 255, 0.5)',
        },
        {
            icon: '🌐',
            title: 'Web & Application Development',
            description: 'Creating scalable web and mobile applications designed for performance and usability.',
            gradient: 'var(--gradient-secondary)',
            shadowColor: 'rgba(168, 85, 247, 0.5)',
        },
        {
            icon: '🤖',
            title: 'AI, Data Science & Intelligent Systems',
            description: 'Leveraging AI and data science to build intelligent, automated solutions.',
            gradient: 'var(--gradient-tertiary)',
            shadowColor: 'rgba(59, 130, 246, 0.5)',
        },
        {
            icon: '⚙️',
            title: 'Automation & Emerging Technologies',
            description: 'Implementing automation and emerging tech to streamline processes and enhance productivity.',
            gradient: 'var(--gradient-accent)',
            shadowColor: 'rgba(236, 72, 153, 0.5)',
        },
        {
            icon: '🔬',
            title: 'Product-based Innovation & Prototyping',
            description: 'From concept to prototype to production—building innovative digital products.',
            gradient: 'var(--gradient-aurora)',
            shadowColor: 'rgba(0, 240, 255, 0.5)',
        },
        {
            icon: <FaCloud />,
            title: 'Cloud-Based Solutions & Scalable Infrastructure',
            description: 'Delivering secure, high-performance cloud infrastructure and microservices for modern enterprises.',
            gradient: 'var(--gradient-accent)',
            shadowColor: 'rgba(236, 72, 153, 0.5)',
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
                        Our <span className="gradient-text">Focused Domains</span>
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
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                style={{
                                    display: 'inline-block',
                                    filter: `drop-shadow(0 0 20px ${service.shadowColor})`,
                                    marginBottom: 'var(--spacing-lg)',
                                }}
                            >
                                {typeof service.icon === 'string' ? (
                                    <div style={{
                                        fontSize: '4rem',
                                        display: 'inline-block',
                                    }}>
                                        {service.icon}
                                    </div>
                                ) : (
                                    <div style={{
                                        fontSize: '4rem',
                                        display: 'inline-block',
                                        background: service.gradient,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}>
                                        {service.icon}
                                    </div>
                                )}
                            </motion.div>

                            {/* Content */}
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-description">{service.description}</p>

                            {/* Hover Glow */}
                            <div className="service-glow" style={{ background: service.gradient }} />
                        </motion.div>
                    ))}
                </motion.div>
            </div >
        </section >
    );
};

export default Services;
