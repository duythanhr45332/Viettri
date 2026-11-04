'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './TropicalVillaSection.module.css';

interface RoomItem {
  id: string;
  name: string;
  pin: number;
}

interface FloorData {
  name: string;
  area: string;
  rooms: RoomItem[];
}

interface TropicalVillaSectionProps {
  dict?: {
    title?: string;
    desc?: string;
    imageAlt?: string;
    stats?: {
      quantityLabel?: string;
      quantity?: string;
      scaleLabel?: string;
      scale?: string;
      areaLabel?: string;
      area?: string;
    };
    floorPlan?: {
      layoutEmpty?: string;
      layoutFurnished?: string;
      floorLabel?: string;
      modeLabel?: string;
      prefixEmpty?: string;
      prefixFurnished?: string;
      pinLabel?: string;
      diagramAlt?: string;
      floors?: Record<string, FloorData>;
    };
  };
}

const RENDER_3D = '/images/villas/c1b22bd783885906e3ed642aac23139c6b103d48.png';

// Tropical floor plan images
const FLOOR_IMAGES: Record<string, { empty: string; furnished: string }> = {
  '1': {
    empty: '/images/Noithat/TR-L1.png',
    furnished: '/images/Noithat/TR-L1- Noithat.png',
  },
  '2': {
    empty: '/images/Noithat/TR-L2.png',
    furnished: '/images/Noithat/TR-L2- Noithat.png',
  },
  '3': {
    empty: '/images/Noithat/TR-L3.png',
    furnished: '/images/Noithat/TR-L3- Noithat.png',
  },
};

export default function TropicalVillaSection({ dict }: TropicalVillaSectionProps) {
  const [selectedFloor, setSelectedFloor] = useState<string>('1');
  const [layoutMode, setLayoutMode] = useState<'empty' | 'furnished'>('empty');

  const currentFloorData = dict?.floorPlan?.floors?.[selectedFloor];

  const headerPrefix = layoutMode === 'empty'
    ? dict?.floorPlan?.prefixEmpty
    : dict?.floorPlan?.prefixFurnished;

  const currentFloorImg = FLOOR_IMAGES[selectedFloor]?.[layoutMode] || FLOOR_IMAGES['1'][layoutMode];

  const diagramAltText = `${dict?.floorPlan?.diagramAlt || ''} ${currentFloorData?.name || ''}`.trim();

  return (
    <section className={styles.section} data-node-id="112:1676" id="tropical-villa">
      <div className={styles.container}>
        {/* Section Intro: Headline & Specs */}
        <div className={styles.introRow} data-node-id="112:1677">
          <div className={styles.headlineCol}>
            <h2 className={styles.headline} data-node-id="112:1678">
              {dict?.title}
            </h2>
          </div>

          <div className={styles.infoCol} data-node-id="112:1679">
            <p className={styles.bodyText} data-node-id="112:1680">
              {dict?.desc}
            </p>

            {/* Specs Summary Row - Node 112:1681 */}
            <div className={styles.specsRow} data-node-id="112:1681">
              <div className={styles.specItem}>
                <span className={styles.specLabel}>{dict?.stats?.quantityLabel}</span>
                <span className={styles.specValue}>{dict?.stats?.quantity}</span>
              </div>
              <div className={styles.specDivider} />
              <div className={styles.specItem}>
                <span className={styles.specLabel}>{dict?.stats?.scaleLabel}</span>
                <span className={styles.specValue}>{dict?.stats?.scale}</span>
              </div>
              <div className={styles.specDivider} />
              <div className={styles.specItem}>
                <span className={styles.specLabel}>{dict?.stats?.areaLabel}</span>
                <span className={styles.specValue}>{dict?.stats?.area}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Render Architectural Visual - Node 112:1694 */}
        <div className={styles.render3DWrapper} data-node-id="112:1694">
          <Image
            src={RENDER_3D}
            alt={dict?.imageAlt || ''}
            fill
            className={styles.renderImage}
          />
        </div>

        {/* Interactive Floor Plan Viewer - Node 112:1695 */}
        <div className={styles.floorPlanRow} data-node-id="112:1695">
          {/* Left: Interactive Diagram */}
          <div className={styles.diagramWrapper} data-node-id="112:1696">
            <div className={styles.diagramInner}>
              <Image
                src={currentFloorImg}
                alt={diagramAltText}
                fill
                className={styles.diagramImage}
              />
            </div>
          </div>

          {/* Right: Data & Filter Controls - Node 112:1705 */}
          <div className={styles.detailsCol} data-node-id="112:1705">
            {/* Title & Area */}
            <div className={styles.detailsHeader} data-node-id="112:1706">
              <h3 className={styles.detailsTitle} data-node-id="112:1707">
                {headerPrefix && currentFloorData?.name ? `${headerPrefix} ${currentFloorData.name}` : currentFloorData?.name}
              </h3>
              <p className={styles.detailsArea} data-node-id="112:1708">
                {currentFloorData?.area}
              </p>
            </div>

            {/* Filter Buttons */}
            <div className={styles.filterSection} data-node-id="112:1709">
              {/* Layout Mode Filter */}
              <div className={styles.filterRow} data-node-id="112:1710">
                <span className={styles.filterLabel} data-node-id="112:1711">
                  {dict?.floorPlan?.modeLabel}
                </span>
                <div className={styles.btnGroup}>
                  <button
                    type="button"
                    className={`${styles.pillBtn} ${layoutMode === 'empty' ? styles.pillBtnActive : ''}`}
                    onClick={() => setLayoutMode('empty')}
                  >
                    {dict?.floorPlan?.layoutEmpty}
                  </button>
                  <button
                    type="button"
                    className={`${styles.pillBtn} ${layoutMode === 'furnished' ? styles.pillBtnActive : ''}`}
                    onClick={() => setLayoutMode('furnished')}
                  >
                    {dict?.floorPlan?.layoutFurnished}
                  </button>
                </div>
              </div>

              {/* Floor Filter */}
              <div className={styles.filterRow} data-node-id="112:1719">
                <span className={styles.filterLabel} data-node-id="112:1720">
                  {dict?.floorPlan?.floorLabel}
                </span>
                <div className={styles.floorBtnGroup}>
                  {['1', '2', '3'].map((floor) => (
                    <button
                      key={floor}
                      type="button"
                      className={`${styles.floorPillBtn} ${selectedFloor === floor ? styles.pillBtnActive : ''}`}
                      onClick={() => setSelectedFloor(floor)}
                      aria-label={`${dict?.floorPlan?.floorLabel || ''} ${floor}`.trim()}
                    >
                      {floor}
                    </button>
                  ))}
                </div>
              </div>

              {/* Room Legend List */}
              <div className={styles.roomList}>
                {currentFloorData?.rooms?.map((room) => (
                  <div key={room.id} className={styles.roomRow}>
                    <span className={styles.roomId}>{room.id}</span>
                    <span className={styles.roomName}>{room.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
