import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { aboutData } from '../../data';
import './styles/About.css';

const About = ({ data = aboutData }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  // Create hover states for all skills
  const [skillHoverStates, setSkillHoverStates] = useState(
    data.skills.reduce((acc, skill, index) => ({ ...acc, [index]: false }), {})
  );

  // Create hover states for all fun facts
  const [funFactHoverStates, setFunFactHoverStates] = useState(
    data.funFacts.reduce((acc, item, index) => ({ ...acc, [index]: false }), {})
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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

  const latestWork = data.experience.latestWork;

  return (
    <section id="about" className="about" ref={ref}>
      <div className="about-container">
        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="about-main-content">
            {/* Left side - About Me text (70%) */}
            <motion.div className="about-text-section" variants={itemVariants}>
              <motion.div className="section-header" variants={itemVariants}>
                <h2 className="section-title">About Me</h2>
                <div className="section-line"></div>
              </motion.div>

              <motion.div className="about-text" variants={itemVariants}>
                <p className="about-paragraph">
                  {data.description}
                </p>

                {
                  data.experience.latestWork ? (
                    <p className="about-paragraph italic">
                      Currently working as a <span className="highlight">{latestWork}</span> at
                      <span className="company-highlight"> Zoho Corp</span> since {latestWork.duration.from},
                      where I continue to grow and contribute to cutting-edge projects.
                    </p>
                  ) : null}
              </motion.div>
            </motion.div>

            {/* Right side - Skills & Beyond Code (30%) */}
            <motion.div className="about-side-content" variants={itemVariants}>
              <div className="subtitle-sections">
                {/* Technologies & Skills - Pill Style */}
                <motion.div className="skills-section-subtle" variants={itemVariants}>
                  <div className="skills-pills">
                    {data.skills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        className="skill-pill"
                        whileHover={{
                          scale: 1.05,
                          y: -4,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        style={{ position: 'relative', overflow: 'hidden' }}
                        onHoverStart={() => setSkillHoverStates(prev => ({ ...prev, [index]: true }))}
                        onHoverEnd={() => setSkillHoverStates(prev => ({ ...prev, [index]: false }))}
                      >
                        <motion.div
                          style={{
                            position: 'absolute',
                            top: 0,
                            width: '100%',
                            height: '100%',
                            background: 'var(--bg-inverse)',
                            borderRadius: '32px',
                            zIndex: 1
                          }}
                          initial={{ left: '-100%' }}
                          animate={{
                            left: skillHoverStates[index] ? '0%' : '-100%',
                            transition: { duration: 0.4, ease: 'easeInOut' }
                          }}
                        />
                        <motion.span
                          style={{
                            position: 'relative',
                            zIndex: 2
                          }}
                          animate={{
                            color: skillHoverStates[index] ? 'var(--text-inverse)' : 'var(--text-primary)',
                            transition: { duration: 0.2, delay: skillHoverStates[index] ? 0.1 : 0 }
                          }}
                        >
                          {skill}
                        </motion.span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Separator Line */}
                <div className="section-separator"></div>

                {/* Beyond Code - Pill Style */}
                <motion.div className="fun-facts-subtle" variants={itemVariants}>
                  <div className="fun-facts-pills">
                    {data.funFacts.map((item, index) => (
                      <motion.div
                        key={item.text}
                        className="fun-fact-pill"
                        whileHover={{
                          scale: 1.05,
                          y: -4,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        style={{ position: 'relative', overflow: 'hidden' }}
                        onHoverStart={() => setFunFactHoverStates(prev => ({ ...prev, [index]: true }))}
                        onHoverEnd={() => setFunFactHoverStates(prev => ({ ...prev, [index]: false }))}
                      >
                        <motion.div
                          style={{
                            position: 'absolute',
                            top: 0,
                            width: '100%',
                            height: '100%',
                            background: 'var(--bg-inverse)',
                            borderRadius: '32px',
                            zIndex: 1
                          }}
                          initial={{ left: '-100%' }}
                          animate={{
                            left: funFactHoverStates[index] ? '0%' : '-100%',
                            transition: { duration: 0.4, ease: 'easeInOut' }
                          }}
                        />
                        <motion.span
                          style={{
                            position: 'relative',
                            zIndex: 2
                          }}
                          animate={{
                            color: funFactHoverStates[index] ? 'var(--text-inverse)' : 'var(--text-primary)',
                            transition: { duration: 0.2, delay: funFactHoverStates[index] ? 0.1 : 0 }
                          }}
                        >
                          {item.emoji} {item.text}
                        </motion.span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
