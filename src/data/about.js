import { projectsData } from './projects';
import { calculateYearsSince } from '../utils/date';
import { experienceData } from './experince';


// About section data
export const aboutData = {
  description: "Senior Backend/Platform Engineer with expertise in API Development, automation, and full-stack development. With over 4 years of professional experience, I specialize in building scalable backend systems, managing DevOps pipelines, and creating robust APIs. My journey spans from machine learning projects to enterprise-level backend development at Zoho Corp. I'm passionate about clean code, automation, and learning cutting-edge technologies. When I'm not coding, you'll find me following Formula 1 racing, exploring culinary arts, or planning my next road trip.",
  
  skills: [
    'Python', 'Django', 'FastAPI', 'Java', 'JavaScript', 'React',
    'DevOps', 'Docker', 'Linux', 'Git', 'CI/CD', 'API Development'
  ],

  funFacts: [
    { emoji: '🏎️', text: 'Racing' },
    { emoji: '🎨', text: 'Art' },
    { emoji: '🌙', text: 'Dreams' }
  ],

  experience: {
    years: `${calculateYearsSince("08-2021")}+`,
    projects: projectsData.projects.length,
    works: experienceData.works,
    latestWork: getLatestWork(experienceData.works),
  },

  interests: [
    "Formula 1 Racing",
    "Culinary Arts",
    "Cloud Architecture",
    "Open Source Contributions",
    "Travel & Photography"
  ]
};


function getLatestWork(works) {
  // get the latest work based on the 'from' date
  // and return it if the 'to' date is either not present or is in the future
  // otherwise return null
  const latestWork = works.reduce((latest, work) => {
    const latestFrom = new Date(latest.duration.from);
    const workFrom = new Date(work.duration.from);
    return workFrom > latestFrom ? work : latest;
  }, works[0]);

  const toDate = latestWork.duration.to ? new Date(latestWork.duration.to) : null;
  if (toDate && toDate < new Date()) {
    return null;
  }
  return latestWork;
}