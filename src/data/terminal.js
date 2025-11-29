import { calculateYearsSince } from '../utils/date';
import { personalInfo } from './personal';

export const terminalData = {
  systemCommands: {
    list: [
      {
        commands: ["cd"],
        description: "Change directory",
      },
      {
        commands: ["cls", "clear"],
        description: "Clear the terminal screen",
      },
      {
        commands: ["echo", "print"],
        description: "Display a line of text",
      },
      {
        commands: ["cat"],
        description: "Display the contents of a file",
      },
      {
        commands: ["whoami", "id"],
        description: "Display the current user",
      },
      {
        commands: ["help", "man", "info", "?"],
        description: "Display help information",
      }
    ],
    description: "Basic System Commands"
  },
  profileCommands: {
    list: [
      {
        commands: ["about"],
        description: "Display information about the user",
      },
      {
        commands: ["skills"],
        description: "Display information about the user's skills",
      },
      {
        commands: ["experience", "education", "qualifications"],
        description: "Display information about the user's work/education information",
      },
      {
        commands: ["projects"],
        description: "Display information about the user's projects",
      },
      {
        commands: ["contact"],
        description: "Display contact information",
      }
    ],
    description: "Profile Related Commands"
  },
  userMemo: {
    about: `👋 Hi! I'm ${personalInfo.name}, ${personalInfo.title}.

🎯 Current Focus: Building scalable software solutions with modern technologies
💼 Experience: ${calculateYearsSince("08-2021")}+ years in software development
🌍 Location: India
🎓 Always learning and exploring new technologies`,
  }
};

export const terminalCommands = [];

function getCommandsHelpString() {
  const lines = [];
  for (const key in terminalData) {
    if (!terminalData.hasOwnProperty(key)) continue;
    // If description exists, add it as a header
    if (terminalData[key].description) {
      lines.push(`${terminalData[key].description}`);
    }
    if (terminalData[key].list) {
      for (const item of terminalData[key].list) {
        const commands = item.commands.join(', ');
        terminalCommands.push(...item.commands);
        lines.push(`├──${commands} - ${item.description}`);
      }
      // Update the last line to end with a different character
      if (lines.length > 0) {
        lines[lines.length - 1] = lines[lines.length - 1].replace('├', '└');
      }
    }
    lines.push(''); // Add an empty line after each section
  }
  return lines.join('\n');
}

export const helpString = getCommandsHelpString();
