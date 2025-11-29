import { aboutData } from "./about";

// Personal and professional information
export const personalInfo = {
  name: "Hariharan S",
  title: "Backend Engineer",
  tagline: "Innovating through code and automation",
  bio: "Senior Backend/Platform Engineer with expertise in API Development, automation, and full-stack development. Always eager to learn and implement cutting-edge technologies.",
  location: "India",
  about: aboutData,
  email: "contact@aigamer.dev", // Replace with actual email
  profileImage: "/images/profile.jpg" // Replace with actual image path
};

// Hero section specific data
export const heroData = {
  greeting: "Hi, I'm",
  name: personalInfo.name,
  title: personalInfo.title,
  tagline: personalInfo.tagline,
  codeSnippets: [
    'const ME = "Software Developer";',
    'function innovate() { return future; }',
    'while(learning) { evolve(); }',
    'ME.find("thrill_in_speed"); // F1 & road trips',
    'ME.create("culinary_masterpieces"); // Cooking & baking',
    'return ME.readyForNextChallenge();'
  ],
  ctaButtons: [
    {
      text: "View My Work",
      href: "#projects",
      primary: true
    },
    {
      text: "Get In Touch",
      href: "#contact",
      primary: false
    }
  ]
};
