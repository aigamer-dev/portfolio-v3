/**
 * Test script to demonstrate the new getAllPossibleIcons functionality
 */

// This would be used in a React component like this:
/*
import { 
  getAllPossibleIcons, 
  getTotalIconCount, 
  searchIcons, 
  getAvailableLibraries 
} from '../utils/iconMapper';

// Usage examples:

// 1. Get all icons organized by library
const allIconsByLibrary = getAllPossibleIcons();
console.log('Icons by library:', allIconsByLibrary);
// Output: { fa: ["FaJava", "FaHome", ...], gr: ["GrTest", ...], ... }

// 2. Get all icons as flat array with library prefixes
const allIconsFlat = getAllPossibleIcons(true);
console.log('All icons with prefixes:', allIconsFlat.slice(0, 10));
// Output: ["fa FaJava", "fa FaHome", "gr GrTest", ...]

// 3. Get total count of available icons
const totalCount = getTotalIconCount();
console.log('Total available icons:', totalCount);
// Output: ~15000+ (depending on react-icons version)

// 4. Search for specific icons
const javaIcons = searchIcons('java');
console.log('Java-related icons:', javaIcons);
// Output: [{ library: 'fa', icon: 'FaJava', fullName: 'fa FaJava' }, ...]

const homeIcons = searchIcons('home', true);
console.log('Home icons with prefixes:', homeIcons);
// Output: ["fa FaHome", "md MdHome", "ai AiOutlineHome", ...]

// 5. Get available libraries
const libraries = getAvailableLibraries();
console.log('Available libraries:', libraries);
// Output: ["ai", "bi", "bs", "cg", "di", "fa", "fa6", ...]
*/

export default function IconUtilsDemo() {
  return (
    <div>
      <h3>Icon Utils Demo</h3>
      <p>Check the source code for usage examples of the new icon utility methods.</p>
    </div>
  );
}
