import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './styles/Contact.css';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const socialLinks = [
    {
      name: 'Email',
      url: 'mailto:hariharan@aigamer.dev',
      icon: '📧',
      label: 'hariharan@aigamer.dev'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/hariharan-s-aigamer/',
      icon: '💼',
      label: 'LinkedIn Profile'
    },
    {
      name: 'GitHub',
      url: 'https://www.github.com/AIGamer28100',
      icon: '🔗',
      label: 'GitHub Repository'
    },
    {
      name: 'Kaggle',
      url: 'https://kaggle.com/aigamer',
      icon: '📊',
      label: 'Kaggle Profile'
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/aigamer_dev',
      icon: '🐦',
      label: 'X Profile'
    },
    {
      name: 'Medium',
      url: 'https://aigamer.medium.com/',
      icon: '✍️',
      label: 'Medium Articles'
    }
  ];

  const handleSocialClick = (url) => {
    window.open(url, '_blank');
  };

  const handleEmailClick = () => {
    window.open('mailto:hariharan@aigamer.dev', '_blank');
  };

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="contact-container">
        <motion.div
          className="contact-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Let's Connect</h2>
            <div className="section-line"></div>
          </motion.div>

          <motion.div className="contact-intro" variants={itemVariants}>
            <h3 className="contact-headline">
              I'm always interested to talk about cool stuff
            </h3>
            <p className="contact-description">
              Whether you have a project in mind, want to collaborate, or just want to chat about technology, 
              I'd love to hear from you. Let's build something amazing together!
            </p>
          </motion.div>

          <motion.div className="contact-cta" variants={itemVariants}>
            <motion.button
              className="btn btn-primary contact-primary-btn"
              onClick={handleEmailClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's talk.
            </motion.button>
          </motion.div>

          <motion.div className="social-links" variants={itemVariants}>
            <h4 className="social-title">Find me on</h4>
            <div className="social-grid">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.name}
                  className="social-item"
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ 
                    scale: 1.05,
                    y: -2
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSocialClick(social.url)}
                >
                  <div className="social-icon">{social.icon}</div>
                  <div className="social-info">
                    <div className="social-name">{social.name}</div>
                    <div className="social-label">{social.label}</div>
                  </div>
                  <div className="social-arrow">→</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="contact-footer" variants={itemVariants}>
            <div className="location-info">
              <div className="location-item">
                <span className="location-icon">🌍</span>
                <span className="location-text">Based in India</span>
              </div>
              <div className="location-item">
                <span className="location-icon">🕐</span>
                <span className="location-text">Available for opportunities</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
