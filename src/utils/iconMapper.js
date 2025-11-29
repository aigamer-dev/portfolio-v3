/**
 * Icon Mapper Utility
 * Converts icon names to React Icon components
 * 
 * Usage:
 * - getIconComponent('fa FaJava') returns the FaJava component
 * - renderIcon('fa FaJava', { size: 24, color: 'blue' }) returns <FaJava size={24} color="blue" />
 */

import React from 'react';

// Import all icon libraries from react-icons
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';
import * as CgIcons from 'react-icons/cg';
import * as DiIcons from 'react-icons/di';
import * as FaIcons from 'react-icons/fa';
import * as Fa6Icons from 'react-icons/fa6';
import * as FcIcons from 'react-icons/fc';
import * as FiIcons from 'react-icons/fi';
import * as GiIcons from 'react-icons/gi';
import * as GoIcons from 'react-icons/go';
import * as GrIcons from 'react-icons/gr';
import * as HiIcons from 'react-icons/hi';
import * as Hi2Icons from 'react-icons/hi2';
import * as ImIcons from 'react-icons/im';
import * as IoIcons from 'react-icons/io';
import * as Io5Icons from 'react-icons/io5';
import * as LiaIcons from 'react-icons/lia';
import * as LuIcons from 'react-icons/lu';
import * as MdIcons from 'react-icons/md';
import * as PiIcons from 'react-icons/pi';
import * as RiIcons from 'react-icons/ri';
import * as RxIcons from 'react-icons/rx';
import * as SiIcons from 'react-icons/si';
import * as SlIcons from 'react-icons/sl';
import * as TbIcons from 'react-icons/tb';
import * as TfiIcons from 'react-icons/tfi';
import * as TiIcons from 'react-icons/ti';
import * as VscIcons from 'react-icons/vsc';
import * as WiIcons from 'react-icons/wi';

// Create a comprehensive icon registry
const iconLibraries = {
  ai: AiIcons,
  bi: BiIcons,
  bs: BsIcons,
  cg: CgIcons,
  di: DiIcons,
  fa: FaIcons,
  fa6: Fa6Icons,
  fc: FcIcons,
  fi: FiIcons,
  gi: GiIcons,
  go: GoIcons,
  gr: GrIcons,
  hi: HiIcons,
  hi2: Hi2Icons,
  im: ImIcons,
  io: IoIcons,
  io5: Io5Icons,
  lia: LiaIcons,
  lu: LuIcons,
  md: MdIcons,
  pi: PiIcons,
  ri: RiIcons,
  rx: RxIcons,
  si: SiIcons,
  sl: SlIcons,
  tb: TbIcons,
  tfi: TfiIcons,
  ti: TiIcons,
  vsc: VscIcons,
  wi: WiIcons,
};

/**
 * Parse icon string to extract library and icon name
 * @param {string} iconString - Format: "fa FaJava" or "gr GrTest"
 * @returns {Object} - { library: 'fa', iconName: 'FaJava' }
 */
export const parseIconString = (iconString) => {
  if (!iconString || typeof iconString !== 'string') {
    return { library: null, iconName: null };
  }

  const parts = iconString.trim().split(/\s+/);
  if (parts.length !== 2) {
    return { library: null, iconName: null };
  }

  const [library, iconName] = parts;
  return { 
    library: library.toLowerCase(), 
    iconName: iconName 
  };
};

/**
 * Get icon component from icon string
 * @param {string} iconString - Format: "fa FaJava" or "gr GrTest"
 * @returns {React.Component|null} - The icon component or null if not found
 */
export const getIconComponent = (iconString) => {
  const { library, iconName } = parseIconString(iconString);
  
  if (!library || !iconName) {
    console.warn(`Invalid icon string format: "${iconString}". Expected format: "library IconName" (e.g., "fa FaJava")`);
    return null;
  }

  const iconLibrary = iconLibraries[library];
  if (!iconLibrary) {
    console.warn(`Icon library "${library}" not found. Available libraries:`, Object.keys(iconLibraries));
    return null;
  }

  const IconComponent = iconLibrary[iconName];
  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in library "${library}". Please check the icon name.`);
    return null;
  }

  return IconComponent;
};

/**
 * Render icon component with props
 * @param {string} iconString - Format: "fa FaJava" or "gr GrTest"
 * @param {Object} props - Props to pass to the icon component (size, color, className, etc.)
 * @returns {React.Element|null} - Rendered icon element or null if not found
 */
export const renderIcon = (iconString, props = {}) => {
  const IconComponent = getIconComponent(iconString);
  
  if (!IconComponent) {
    return null;
  }

  return React.createElement(IconComponent, props);
};

/**
 * Generate import statement for an icon
 * @param {string} iconString - Format: "fa FaJava" or "gr GrTest"
 * @returns {string} - Import statement string
 */
export const generateImportStatement = (iconString) => {
  const { library, iconName } = parseIconString(iconString);
  
  if (!library || !iconName) {
    return `// Invalid icon string: "${iconString}"`;
  }

  return `import { ${iconName} } from "react-icons/${library}";`;
};

/**
 * Generate JSX element string for an icon
 * @param {string} iconString - Format: "fa FaJava" or "gr GrTest"
 * @param {Object} props - Props to include in JSX (optional)
 * @returns {string} - JSX element string
 */
export const generateJSXElement = (iconString, props = {}) => {
  const { iconName } = parseIconString(iconString);
  
  if (!iconName) {
    return `{/* Invalid icon string: "${iconString}" */}`;
  }

  const propsString = Object.keys(props).length > 0 
    ? ' ' + Object.entries(props)
        .map(([key, value]) => `${key}={${typeof value === 'string' ? `"${value}"` : value}}`)
        .join(' ')
    : '';

  return `<${iconName}${propsString} />`;
};

/**
 * Check if an icon exists in the registry
 * @param {string} iconString - Format: "fa FaJava" or "gr GrTest"
 * @returns {boolean} - True if icon exists, false otherwise
 */
export const iconExists = (iconString) => {
  return getIconComponent(iconString) !== null;
};

/**
 * Get all available icons from a specific library
 * @param {string} library - Library name (e.g., 'fa', 'gr', 'md')
 * @returns {Array} - Array of icon names from the library
 */
export const getIconsFromLibrary = (library) => {
  const iconLibrary = iconLibraries[library.toLowerCase()];
  if (!iconLibrary) {
    return [];
  }
  return Object.keys(iconLibrary);
};

/**
 * Get all available libraries
 * @returns {Array} - Array of available library names
 */
export const getAvailableLibraries = () => {
  return Object.keys(iconLibraries);
};

/**
 * Get all possible icons from all supported libraries
 * @param {boolean} includeLibraryPrefix - Whether to include library prefix in icon names (default: false)
 * @returns {Object|Array} - Object with library keys and icon arrays, or flat array if includeLibraryPrefix is true
 */
export const getAllPossibleIcons = (includeLibraryPrefix = false) => {
  if (includeLibraryPrefix) {
    // Return flat array with library prefix format: ["fa FaJava", "gr GrTest", ...]
    const allIcons = [];
    Object.entries(iconLibraries).forEach(([libraryName, libraryIcons]) => {
      Object.keys(libraryIcons).forEach(iconName => {
        allIcons.push(`${libraryName} ${iconName}`);
      });
    });
    return allIcons;
  } else {
    // Return object with library keys: { fa: ["FaJava", ...], gr: ["GrTest", ...], ... }
    const allIcons = {};
    Object.entries(iconLibraries).forEach(([libraryName, libraryIcons]) => {
      allIcons[libraryName] = Object.keys(libraryIcons);
    });
    return allIcons;
  }
};

/**
 * Get total count of all available icons across all libraries
 * @returns {number} - Total number of icons available
 */
export const getTotalIconCount = () => {
  let totalCount = 0;
  Object.values(iconLibraries).forEach(libraryIcons => {
    totalCount += Object.keys(libraryIcons).length;
  });
  return totalCount;
};

/**
 * Search for icons by name pattern across all libraries
 * @param {string} searchTerm - Search term to match icon names (case-insensitive)
 * @param {boolean} includeLibraryPrefix - Whether to include library prefix in results
 * @returns {Array} - Array of matching icon names
 */
export const searchIcons = (searchTerm, includeLibraryPrefix = false) => {
  const matchingIcons = [];
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  Object.entries(iconLibraries).forEach(([libraryName, libraryIcons]) => {
    Object.keys(libraryIcons).forEach(iconName => {
      if (iconName.toLowerCase().includes(lowerSearchTerm)) {
        if (includeLibraryPrefix) {
          matchingIcons.push(`${libraryName} ${iconName}`);
        } else {
          matchingIcons.push({
            library: libraryName,
            icon: iconName,
            fullName: `${libraryName} ${iconName}`
          });
        }
      }
    });
  });
  
  return matchingIcons;
};

// Default export for easy importing
const iconMapperUtils = {
  parseIconString,
  getIconComponent,
  renderIcon,
  generateImportStatement,
  generateJSXElement,
  iconExists,
  getIconsFromLibrary,
  getAvailableLibraries,
  getAllPossibleIcons,
  getTotalIconCount,
  searchIcons,
};

export default iconMapperUtils;
