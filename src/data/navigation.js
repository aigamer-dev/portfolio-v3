// Navigation and site-wide data
export const navigationData = {
  logo: {
    text: "AIGAMER",
    id: "home",
    href: "#home"
  },
  
  menuItems: [
    {
      label: "About", 
      href: "#about",
      id: "about"
    },
    {
      label: "Projects",
      href: "#projects", 
      id: "projects"
    },
    {
      label: "Contact",
      href: "#contact",
      id: "contact"
    }
  ],
  
  theme : {
    current: "dark",
    options: ["light", "dark"],
    icons: {
      light: "☀️",
      dark: "🌙",
    }
  }
};

