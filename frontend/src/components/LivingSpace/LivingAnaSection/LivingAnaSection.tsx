import React from 'react';
import Image from 'next/image';
import styles from './LivingAnaSection.module.css';

interface AnaItem {
  text: string;
}

interface LivingAnaSectionProps {
  dict: {
    title: string;
    desc: string;
    items: AnaItem[];
  };
}

/* Figma node 45:2883 — "2. INTRODUCTION" (Ana Services) */
const IMG_BG = '/images/khong-gian-song/34c999b4d9cf2d2084f2e9876604d2317e729b0e.png'; // Rectangle 67
const IMG_ANA_LOGO = '/images/khong-gian-song/a0fe7cc2dc20fb55d4b5b900b11727eeb3357906.png'; // Rectangle 81 (mask)
const IMG_LANDSCAPE = '/images/khong-gian-song/c7b4a7bf8510474d1af03548bc3361f5ee7faa2e.png'; // Rectangle 76
const IMG_SECURITY = '/images/khong-gian-song/bd9f677a9e81b4f9a5a16934c279998f4012bc5f.png'; // Rectangle 77
const ICON_LEAF = '/images/khong-gian-song/4549ea50ac5a7f06c29baeddce36f8509d3d79a9.svg';
const ICON_SHIELD = '/images/khong-gian-song/dcf4c824a303b4c297db5a293933a4fd62f11147.svg';
const FLOURISH = '/images/khong-gian-song/d95de25519c4556976c7e911a0150f217c87eab9.svg';

export default function LivingAnaSection({ dict }: LivingAnaSectionProps) {
  const [item1 = { text: '' }, item2 = { text: '' }] = dict?.items || [];

  return (
    <section className={styles.section} data-node-id="45:2883">
      {/* 45:2884 — background photo (mirrored) + 45:2885 / 45:2886 gradients */}
      <div className={styles.bgPhoto} aria-hidden>
        <div className={styles.bgPhotoInner}>
          <Image src={IMG_BG} alt="" fill className={styles.bgPhotoImg} />
        </div>
      </div>
      <div className={styles.bgPhotoShade} aria-hidden />
      <div className={styles.bgFade} aria-hidden />

      <div className={styles.container}>
        {/* 45:2887 — header row, gap 172 */}
        <div className={styles.header}>
          <h2 className={styles.title}>{dict.title}</h2>

          {/* 45:2889 — gap 230 */}
          <div className={styles.headerRight}>
            <div className={styles.narrative}>
              <p className={styles.desc}>{dict.desc}</p>
              <span
                className={styles.anaLogo}
                role="img"
                aria-label="Ana Services"
                style={{ maskImage: `url("${IMG_ANA_LOGO}")`, WebkitMaskImage: `url("${IMG_ANA_LOGO}")` }}
              />
            </div>
            <img src={FLOURISH} alt="" aria-hidden className={styles.flourish} />
          </div>
        </div>

        {/* 45:2897 — cards, gap 60, aligned bottom */}
        <div className={styles.cards}>
          <figure className={`${styles.card} ${styles.cardLarge}`}>
            <div className={styles.cardImage}>
              <Image
                src={IMG_LANDSCAPE}
                alt={item1.text}
                fill
                className={styles.cardImg}
              />
            </div>
            <figcaption className={styles.caption}>
              <img src={ICON_LEAF} alt="" aria-hidden className={styles.captionIcon} />
              <span>{item1.text}</span>
            </figcaption>
          </figure>

          <figure className={`${styles.card} ${styles.cardSmall}`}>
            <div className={styles.cardImage}>
              <Image
                src={IMG_SECURITY}
                alt={item2.text}
                fill
                className={styles.cardImg}
              />
            </div>
            <figcaption className={styles.caption}>
              <img src={ICON_SHIELD} alt="" aria-hidden className={styles.captionIcon} />
              <span>{item2.text}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
