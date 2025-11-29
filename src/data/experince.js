// Experience data
// List of the Companies and its details

export const Companies = {
  verzeo: {
    name: "Verzeo",
    website: "https://www.verzeo.com/",
  },
  cyces: {
    name: "Cyces Innovations Lab LLP",
    website: "https://www.cyces.com/",
  },
  kavisoftek: {
    name: "KaviSoftek",
    website: "https://www.kavisoft.com/",
  },
  zoho: {
    name: "Zoho Corp",
    website: "https://www.zoho.com",
  },
}


export const experienceData = {
  title: "Work Experience",
  subtitle: "A summary of my professional journey",

  works: [
    {
      id: 1,
      org: Companies.verzeo,
      role: "Virtual Intern",
      duration: {
        from: "2021-02-01",  // February 1st 2021
        to: "2021-03-31",  // March 31st 2021
      },
      location: "Remote",
      description: "Completed a virtual internship focused on Machine Learning with Python. Led a team of 20 members to build and train an ML model for human classification in collaboration with zebo.ai.",
      tech: ["TensorFlow", "Python", "NumPy", "Pandas", "Selenium", "OpenCV", "Pillow"],
      icon: "🖥️",
    },
    {
      id: 2,
      org: Companies.cyces,
      role: "Django Backend Developer (Internship)",
      duration: {
        from: "2021-08-02",  // August 2nd 2021
        to: "2022-01-31",  // January 31st 2022
      },
      location: "Remote",
      description: "Focused on core Python/Django REST API development, building a foundational Chat Application, and customizing Admin/Workflow Dashboards (MS SQL) for client projects.",
      tech: ["Django", "Django REST Framework", "Docker", "GitLab", "React.js", "Celery", "Linux"],
      icon: "🧑‍💻",
    },
    {
      id: 3,
      org: Companies.cyces,
      role: "Junior Backend Developer",
      duration: {
        from: "2022-02-01",  // February 1st 2022
        to: "2022-08-06",  // August 6th 2022
      },
      location: "Remote",
      description: "Engineered, initiated, and fully deployed the scalable Python/Django REST API backend for a new Influencer Marketing Platform, while maintaining CI/CD and ensuring clean, high-quality code.",
      tech: ["Django", "Django REST Framework", "Docker", "GitLab", "React.js", "Celery", "Linux"],
      icon: "🌱",
    },
    {
      id: 4,
      org: Companies.kavisoftek,
      role: "Backend Developer",
      duration: {
        from: "2022-08-10",  // August 10th 2022
        to: "2022-10-31",  // October 31st 2022
      },
      location: "Remote",
      description: "Developed and maintained backend services using Django REST Framework, managed AWS instances, and implemented CI/CD pipelines with Docker and GitLab for seamless deployments.",
      tech: ["Django", "Django REST Framework", "Docker", "GitLab", "AWS EC2", "Linux", "CVAT"],
      icon: "💻",
    },
    {
      id: 5,
      org: Companies.zoho,
      role: "Member Technical Staff",
      duration: {
        from: "2022-11-21",  // November 21st 2022
        to: "2025-10-03",  // October 3rd 2025
      },
      location: "Chennai, Tamil Nadu, India  /  Palladam, Tamil Nadu, India",
      description: "As a Member of Technical Staff at Zoho on the Zlabs - ASR team, I am responsible for maintaining and enhancing a service that is supported by various other product teams. My role involves managing the API code, Java JDK development, server maintenance, deployments, and continuous integration processes. I also collaborate with other teams to build requested features and ensure seamless integration with our service. Additionally, I take pride in documenting and preparing comprehensive learning materials to assist other teams in leveraging our service effectively.",
      tech: [
        "Java", "DevOps", "Data Pipelines", "Continuous Integration (CI)", "Technical Documentation",
        "FastAPI", "API Testing", "Zoho Catalyst", "Pydantic", "Python", "Linux", "Zoho Analytics",
        "Crontabs", "Python Automation", "Zoho Logs", "Kafka", "ZQueue"
      ],
      icon: "🚀",
    },
  ],
};


