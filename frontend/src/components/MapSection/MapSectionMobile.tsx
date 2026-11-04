'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './MapSectionMobile.module.css';

export default function MapSectionMobile({ dict }: { dict: any }) {
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 1));
  };

  // Capitalize dynamically to match Figma's "Giao hòa nơi tâm điểm kết nối" if needed
  const hasLocations = Boolean(dict?.locations && dict.locations.length > 0);

  return (
    <div className={`${styles.mobileContainer} ${!hasLocations ? styles.noLocations : ''}`}>
      {/* Content */}
      <div className={styles.content}>
        <div className={styles.header}>
          {dict?.subtitle && <p className={styles.subtitle}>{dict.subtitle}</p>}
          <div className={styles.title}>
            {dict?.title1 && <p className={styles.titleLine}>{dict.title1}</p>}
            {dict?.title2 && <p className={styles.titleLine}>{dict.title2}</p>}
            {dict?.title3 && <p className={styles.titleLine}>{dict.title3}</p>}
          </div>
          {dict?.narrative && <p className={styles.narrative}>{dict.narrative}</p>}
        </div>

        {dict?.locations && dict.locations.length > 0 && (
          <div className={styles.list}>
            {dict.locations.map((loc: any, index: number) => (
              <div key={index} className={styles.row}>
                <p className={styles.locName}>{loc.name}</p>
                <p className={styles.locDistance}>{loc.distance}</p>
              </div>
            ))}
            <div className={styles.divider} />
          </div>
        )}
      </div>

      {/* Map Background/Image */}
      <div className={styles.mapWrapper}>
        <Image
          src="/images/mapmb.png"
          alt="Viettri Legacy Map Mobile"
          fill
          className={styles.mapImage}
          style={{ 
            transform: `scale(${zoomLevel})`, 
            transformOrigin: 'center center',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' 
          }}
        />

        {/* Zoom Controls inside map container */}
        <div className={styles.zoomControls}>
          <button className={styles.zoomButton} onClick={handleZoomIn} aria-label="Zoom In">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className={styles.zoomButton} onClick={handleZoomOut} aria-label="Zoom Out">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
