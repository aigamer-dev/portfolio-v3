import { motion } from 'framer-motion';
import TerminalCode from '../TerminalCode';
import { heroData } from '../../data';
import './styles/Hero.css';

const Hero = ({ data = heroData }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 40, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="hero" id="home">
            <div className="container-fluid">
                <motion.div
                    className="hero-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div className="hero-text" variants={itemVariants}>
                        <motion.h1 className="hero-title" variants={itemVariants}>
                            Hi, I'm <span className="text-accent">{data.name}</span>
                        </motion.h1>

                        <motion.h2 className="hero-subtitle" variants={itemVariants}>
                            {data.title}
                        </motion.h2>

                        <motion.p className="hero-description" variants={itemVariants}>
                            {data.tagline}
                        </motion.p>

                        <motion.div className="hero-cta" variants={itemVariants}>
                            {data.ctaButtons.map((button, index) => (
                                <motion.a
                                    key={index}
                                    href={button.href}
                                    className={`btn ${button.primary ? 'btn-primary' : 'btn-secondary'}`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {button.text}
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div className="hero-code" variants={itemVariants}>
                        <TerminalCode
                            initialMode="interactive"
                            showOrb={true}
                        />
                    </motion.div>
                </motion.div>

                <motion.div
                    className="scroll-indicator"
                    animate={{
                        y: [0, 10, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <div className="scroll-line"></div>
                    <span className="scroll-text">Scroll to explore</span>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
