/**
 * DynamicIcon Component
 * A React component that renders icons dynamically from icon strings
 * 
 * Usage:
 * <DynamicIcon icon="fa FaJava" size={24} color="blue" />
 * <DynamicIcon icon="gr GrTest" className="my-icon" />
 * <DynamicIcon icon="md MdHome" title="Home Icon" />
 * <DynamicIcon icon="invalidIcon" /> // Will show TfiLayoutWidthDefaultAlt as fallback
 * <DynamicIcon icon="invalidIcon" useDefaultFallback={false} fallback={<span>Custom fallback</span>} />
 */

import PropTypes from 'prop-types';
import { renderIcon, iconExists } from '../../utils/iconMapper';

// Default fallback icon when icon is not found
const DEFAULT_FALLBACK_ICON = "tfi TfiLayoutWidthDefaultAlt";

const DynamicIcon = ({ 
  icon, 
  fallback = null, 
  showWarning = true,
  useDefaultFallback = true,
  ...props 
}) => {
  // Handle empty or invalid icon strings
  if (!icon) {
    if (showWarning) {
      console.warn('DynamicIcon: No icon prop provided');
    }
    
    // Use default fallback icon if enabled, otherwise use provided fallback
    if (useDefaultFallback) {
      return renderIcon(DEFAULT_FALLBACK_ICON, props);
    }
    return fallback;
  }

  // Check if icon exists
  if (!iconExists(icon)) {
    if (showWarning) {
      console.warn(`DynamicIcon: Icon "${icon}" not found, using default fallback`);
    }
    
    // Use default fallback icon if enabled, otherwise use provided fallback
    if (useDefaultFallback) {
      return renderIcon(DEFAULT_FALLBACK_ICON, props);
    }
    return fallback;
  }

  // Render the icon with provided props
  const iconElement = renderIcon(icon, props);
  
  return iconElement || fallback;
};

DynamicIcon.propTypes = {
  /**
   * Icon string in format "library IconName" (e.g., "fa FaJava", "gr GrTest")
   */
  icon: PropTypes.string.isRequired,
  
  /**
   * Fallback element to render if icon is not found
   */
  fallback: PropTypes.node,
  
  /**
   * Whether to show console warnings for missing icons
   */
  showWarning: PropTypes.bool,
  
  /**
   * Whether to use default fallback icon (TfiLayoutWidthDefaultAlt) when icon is not found
   */
  useDefaultFallback: PropTypes.bool,
  
  /**
   * Icon size (can be number or string)
   */
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  
  /**
   * Icon color
   */
  color: PropTypes.string,
  
  /**
   * CSS class name
   */
  className: PropTypes.string,
  
  /**
   * Icon title for accessibility
   */
  title: PropTypes.string,
  
  /**
   * Click handler
   */
  onClick: PropTypes.func,
  
  /**
   * Custom style object
   */
  style: PropTypes.object,
};

DynamicIcon.defaultProps = {
  fallback: null,
  showWarning: true,
  useDefaultFallback: true,
  size: undefined,
  color: undefined,
  className: undefined,
  title: undefined,
  onClick: undefined,
  style: undefined,
};

export default DynamicIcon;
