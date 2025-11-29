/**
 * DynamicIcon Fallback Test Examples
 * 
 * These examples show how the new default fallback behavior works
 */

import React from 'react';
import { DynamicIcon } from '../DynamicIcon';

export default function DynamicIconFallbackTest() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>DynamicIcon Fallback Test</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Valid Icons (should render correctly):</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <DynamicIcon icon="fa FaJava" size={24} />
          <span>fa FaJava</span>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <DynamicIcon icon="md MdHome" size={24} />
          <span>md MdHome</span>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Invalid Icons (should show default fallback - TfiLayoutWidthDefaultAlt):</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <DynamicIcon icon="fa InvalidIcon" size={24} />
          <span>fa InvalidIcon (invalid)</span>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <DynamicIcon icon="xyz NonExistentIcon" size={24} />
          <span>xyz NonExistentIcon (invalid library)</span>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <DynamicIcon icon="" size={24} />
          <span>Empty string (invalid)</span>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Custom Fallback (useDefaultFallback=false):</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <DynamicIcon 
            icon="fa InvalidIcon" 
            size={24} 
            useDefaultFallback={false} 
            fallback={<span style={{ color: 'red' }}>❌</span>} 
          />
          <span>Custom fallback for invalid icon</span>
        </div>
      </div>

      <div>
        <h3>Default Fallback Icon Reference:</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <DynamicIcon icon="tfi TfiLayoutWidthDefaultAlt" size={24} />
          <span>tfi TfiLayoutWidthDefaultAlt (the default fallback icon)</span>
        </div>
      </div>
    </div>
  );
}
