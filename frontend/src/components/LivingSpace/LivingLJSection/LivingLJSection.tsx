import React from 'react';
import Image from 'next/image';
import styles from './LivingLJSection.module.css';

interface LJItem {
  title: string;
  desc: string;
}

interface LivingLJSectionProps {
  dict: {
    title: string;
    desc: string;
    partnerTag: string;
    items: LJItem[];
  };
}

export default function LivingLJSection({ dict }: LivingLJSectionProps) {
  const [item1 = { title: '', desc: '' }, item2 = { title: '', desc: '' }] = dict?.items || [];

  return (
    <section className={styles.section} data-node-id="45:2824">
      {/* Background Texture Overlay */}
      <div className={styles.bgOverlay}>
        <Image
          src="/images/khong-gian-song/da48a55adff63d0412503f4bcafa224231f6f496.png"
          alt=""
          fill
          className={styles.bgTexture}
        />
      </div>

      <div className={styles.container}>
        {/* Header Row */}
        <div className={styles.header}>
          <div className={styles.titleCol}>
            <h2 className={styles.title}>{dict.title}</h2>
          </div>

          <div className={styles.partnerCol}>
            <p className={styles.partnerDesc}>{dict.desc}</p>
            <div className={styles.partnerDivider}></div>
            <div className={styles.partnerBranding}>
              <div className={styles.ljLogoWrapper}>
                <img
                  src="/images/khong-gian-song/449554bc43f983ec656ff84b64488ecd58598f1b.png"
                  alt="LJ-Group"
                  className={styles.ljLogo}
                />
              </div>
              <p className={styles.partnerTag}>{dict.partnerTag}</p>
            </div>
          </div>

          <div className={styles.flourishCol}>
            <img
              src="/images/khong-gian-song/1e2336584c766bd57f19422d60b557491646279d.svg"
              alt=""
              className={styles.flourishSvg}
            />
          </div>
        </div>
      </div>

      {/* Horizontal Divider Line across Section */}
      <div className={styles.sectionDivider}></div>

      {/* 2-Column Showcase */}
      <div className={styles.cardsContainer}>
        {/* Card 1: Lake Park & Ven hồ */}
        <div className={styles.card}>
          <div className={styles.cardImageWrapper}>
            <Image
              src="/images/khong-gian-song/0188340d5462b2cb6a31e934df7e74c7aa48cec8.png"
              alt={item1.title}
              fill
              className={styles.cardImage}
            />
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{item1.title}</h3>
            <p className={styles.cardDesc}>{item1.desc}</p>
          </div>
        </div>

        {/* Vertical Separator */}
        <div className={styles.verticalDivider}></div>

        {/* Card 2: Khu vui chơi & Thể thao */}
        <div className={styles.card}>
          <div className={styles.cardImageWrapper}>
            <Image
              src="/images/khong-gian-song/87457e2297a4197ce941cd5082b1dcab9c8bc529.png"
              alt={item2.title}
              fill
              className={styles.cardImage}
            />
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{item2.title}</h3>
            <p className={styles.cardDesc}>{item2.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
