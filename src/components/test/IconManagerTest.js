/**
 * Icon Manager Test
 * Simple test to verify the icon system is working correctly
 */

import { iconExists, getIconComponent, renderIcon, generateImportStatement, generateJSXElement } from '../utils/iconMapper';

// Test icons
const testIcons = [
  'fa FaJava',
  'gr GrTest', 
  'md MdHome',
  'ai AiOutlineCamera',
  'bs BsGithub',
  'invalid InvalidIcon' // This should fail gracefully
];

console.log('=== Icon Manager Tests ===');

testIcons.forEach(iconString => {
  console.log(`\nTesting: ${iconString}`);
  console.log(`Exists: ${iconExists(iconString)}`);
  console.log(`Import: ${generateImportStatement(iconString)}`);
  console.log(`JSX: ${generateJSXElement(iconString, { size: 24, color: 'blue' })}`);
  
  const component = getIconComponent(iconString);
  console.log(`Component: ${component ? component.name || 'Found' : 'Not found'}`);
});

export default function IconManagerTest() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Icon Manager Test</h2>
      <p>Check the console for test results.</p>
      <p>The icon system is working if you see this component rendered successfully.</p>
    </div>
  );
}
