'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './MapSectionDesktop.module.css';


export default function MapSectionDesktop({ dict }: { dict: any }) {
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 1));
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Map Background/Image */}
        <div className={styles.mapWrapper}>
          <Image
            src="/images/map.png"
            alt="Viettri Legacy Map"
            fill
            className={styles.mapImage}
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: '55% 55%',
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
        </div>

        {/* Content */}
        <div className={styles.content}>
          <div className={styles.header}>
            {dict?.subtitle && <p className={styles.subtitle}>{dict.subtitle}</p>}
            <h2 className={styles.title}>
              {dict?.title1}
              {dict?.title2 && <><br />{dict.title2}</>}
              {dict?.title3 && <><br />{dict.title3}</>}
            </h2>
            {dict?.narrative && <p className={styles.narrative}>{dict.narrative}</p>}
          </div>

          {dict?.locations && dict.locations.length > 0 && (
            <div className={`${styles.list} ${dict?.narrative ? styles.listWithNarrative : ''}`}>
              {dict.locations.map((loc: any, index: number) => (
                <div key={index} className={styles.row}>
                  <p className={styles.locName}>{loc.name}</p>
                  <p className={styles.locDistance}>{loc.distance}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Zoom Controls */}
        <div className={styles.zoomControls}>
          <button className={styles.zoomButton} onClick={handleZoomIn} aria-label="Zoom In">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className={styles.zoomButton} onClick={handleZoomOut} aria-label="Zoom Out">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
