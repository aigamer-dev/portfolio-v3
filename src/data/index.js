// Import all data for the combined object
import { personalInfo, heroData } from './personal';
import { aboutData } from './about';
import { projectsData } from './projects';
import { contactData } from './contact';
import { navigationData } from './navigation';
import { footerData } from './footer';
import { experienceData } from './experince';

// Centralized data exports
export { personalInfo, heroData } from './personal';
export { aboutData } from './about';
export { projectsData } from './projects';
export { contactData } from './contact';
export { navigationData } from './navigation';
export { footerData } from './footer';
export { experienceData } from './experince';

// Combined data object for easy access
export const siteData = {
  personal: personalInfo,
  hero: heroData,
  about: aboutData,
  projects: projectsData,
  experience: experienceData,
  contact: contactData,
  navigation: navigationData,
  footer: footerData,
};
