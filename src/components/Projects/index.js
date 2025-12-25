import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { projectsData } from '../../data';
import './styles/Projects.css';

const Projects = ({ data = projectsData }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Live':
        return 'status-live';
      case 'Development':
        return 'status-development';
      case 'Research':
        return 'status-research';
      case 'Completed':
        return 'status-completed';
      default:
        return 'status-default';
    }
  };

  const handleProjectClick = (project) => {
    if (project.link === '#' || !project.link) {
      // For placeholder links, show a message about React implementation
      alert('This project will be reimplemented in React soon! Currently available in Django on aigamer.dev');
    } else {
      window.open(project.link, '_blank');
    }
  };

  // Filter for featured projects only
  const featuredProjects = data.projects.filter(
    (project) => project.featured || project.is_featured
  );

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="projects-container">
        <motion.div
          className="projects-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">{data.title}</h2>
            <div className="section-line"></div>
            <p className="section-subtitle">{data.subtitle}</p>
          </motion.div>

          <motion.div className="projects-note" variants={itemVariants}>
            <p>
              I'm delighted to share my journey of nearly 3 years as a Backend Developer.
              My expertise spans <span className="highlight">Git</span>, <span className="highlight">FastAPI</span>,
              <span className="highlight">Python Automations</span>, <span className="highlight">Linux</span> and more,
              where I thrive in crafting innovative solutions and fostering collaboration within the tech community.
            </p>
          </motion.div>

          <div className="projects-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            alignItems: 'stretch',
          }}>
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                className="project-card"
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  boxShadow: "var(--shadow-xl)"
                }}
                onClick={() => handleProjectClick(project)}
                style={project.size ? { gridColumn: `span ${project.size}` } : {}}
              >
                <div className="project-header">
                  <div className="project-image">
                    <div className={`project-icon ${project.image}`}>
                      <span className="icon-text">{project.icon}</span>
                    </div>
                  </div>
                  <div className="project-meta">
                    <span className={`project-status ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                    <span className="project-category">{project.category}</span>
                  </div>
                </div>

                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-tech">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="project-footer">
                  <button className="project-link">
                    {project.link === '#' ? 'Coming to React' : 'View Project'}
                    <span className="link-arrow">→</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div className="projects-footer" variants={itemVariants}>
            <p className="update-note">
              I'm updating the whole repo with the latest dependencies and architecture,
              thus having a lot of bugs at the moment. Please wait while I fix the issues
              so you can have a seamless experience here.
            </p>
            <div className="demo-credentials">
              <h4>Demo Credentials for Testing:</h4>
              <div className="credentials">
                <span><strong>Username:</strong> Demo</span>
                <span><strong>Email:</strong> demo@123</span>
                <span><strong>Password:</strong> demo@123</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
