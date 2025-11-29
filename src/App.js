import { motion } from 'framer-motion';
import './styles/globals.css';
import './styles/App.css';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { pageVariants } from './utils/motionVariants';
import { usePortfolioData } from './hooks/usePortfolioData';

function App() {
  const portfolioData = usePortfolioData();

  // Show loading state
  if (portfolioData.isLoading) {
    return (
      <div className="App loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading portfolio data...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="App"
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
    >
      {/* Display API status for debugging */}
      {process.env.NODE_ENV === 'development' && (
        <div className="api-status" style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          padding: '8px 12px',
          background: portfolioData.isUsingAPI ? '#4caf50' : '#ff9800',
          color: 'white',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 9999
        }}>
          {portfolioData.isUsingAPI ? '✓ Using API Data' : '⚠ Using Local Data'}
        </div>
      )}

      <Navigation data={portfolioData.navigation} />
      <Hero data={portfolioData.hero} />
      <About data={portfolioData.about} />
      <Projects data={portfolioData.projects} />
      <Contact data={portfolioData.contact} />
      <Footer data={portfolioData.footer} />
    </motion.div>
  );
}

export default App;
