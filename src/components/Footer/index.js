import React from 'react';
import { motion } from 'framer-motion';
import './styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: 'Email', url: 'mailto:hariharan@aigamer.dev' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/hariharan-s-aigamer/' },
    { name: 'GitHub', url: 'https://www.github.com/AIGamer28100' },
    { name: 'Kaggle', url: 'https://kaggle.com/aigamer' },
    { name: 'X', url: 'https://x.com/aigamer_dev' },
    { name: 'Medium', url: 'https://aigamer.medium.com/' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <motion.div
                className="footer-logo"
                whileHover={{ scale: 1.05 }}
                onClick={handleScrollToTop}
              >
                <span className="logo-text">Hariharan</span>
                <span className="logo-dot">.</span>
              </motion.div>
              <p className="footer-tagline">
                DevOps Engineer by Day<br />
                Coding Enthusiast by Night<br />
                <span className="footer-location">Based in India</span>
              </p>
            </div>

            <div className="footer-links">
              <div className="footer-section">
                <h4 className="footer-section-title">Connect</h4>
                <div className="footer-social">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-social-link"
                      whileHover={{ scale: 1.05, x: 4 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="social-name">{social.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-credits">
              <p className="copyright">
                © {currentYear} Hariharan. All rights reserved.
              </p>
              <p className="design-credit">
                Developed with my expertise, and assisted by GitHub Copilot Chat (Claude Sonnet 4) in VS Code
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
