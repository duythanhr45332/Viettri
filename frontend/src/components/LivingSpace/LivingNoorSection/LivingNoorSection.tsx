import React from 'react';
import Image from 'next/image';
import styles from './LivingNoorSection.module.css';

interface NoorItem {
  index: string;
  title: string;
  desc: string;
}

interface LivingNoorSectionProps {
  dict: {
    title: string;
    desc: string;
    partnerTag: string;
    items: NoorItem[];
  };
}

/* Figma node 45:2782 — "Section_San Pham" (Clubhouse by Noor) */
const IMG_CAFE = '/images/khong-gian-song/ed7b2522a89f76f7fda15036959ac96e36a42190.png'; // Rectangle 79
const IMG_WELLNESS = '/images/khong-gian-song/e9b1d17815f19d9e0c7297036435ef93ac9adfe8.png'; // Rectangle 80
const IMG_LIBRARY = '/images/khong-gian-song/0f5b5cb3eb91d1636c9d1b5f7bfdd774e8437f5d.png'; // Rectangle 81
const IMG_NOOR_LOGO = '/images/khong-gian-song/f52bfe8d73203434f491e56d45d6f061ab5083e9.png'; // Rectangle 49 (mask)

export default function LivingNoorSection({ dict }: LivingNoorSectionProps) {
  const empty = { index: '', title: '', desc: '' };
  const [item1 = empty, item2 = empty, item3 = empty] = dict?.items || [];

  return (
    <section className={styles.section} data-node-id="45:2782">
      {/* 45:2783 — Frame 110 top arc */}
      <div className={styles.topArcWrapper} aria-hidden>
        <img
          src="/images/khong-gian-song/48d9a832a5b914d610c13d0d5f5d69e050ca5ff5.svg"
          alt=""
          className={styles.topArcSvg}
        />
      </div>

      {/* 45:2785 — Introduction: nền full-width, nội dung trong .container chuẩn Home */}
      <div className={styles.body}>
      <div className={styles.container}>
        {/* 45:2788 — Header */}
        <div className={styles.header}>
          <div className={styles.titleCol}>
            <h2 className={styles.title}>{dict.title}</h2>
          </div>

          <div className={styles.partnerCol}>
            <p className={styles.partnerDesc}>{dict.desc}</p>
            <div className={styles.partnerDivider} />
            <div className={styles.partnerBranding}>
              <div className={styles.noorLogoBox}>
                <span
                  className={styles.noorLogo}
                  role="img"
                  aria-label="noor"
                  style={{ maskImage: `url("${IMG_NOOR_LOGO}")`, WebkitMaskImage: `url("${IMG_NOOR_LOGO}")` }}
                />
              </div>
              <p className={styles.partnerTag}>{dict.partnerTag}</p>
            </div>
          </div>
        </div>

        {/* 45:2800 — Staggered gallery */}
        <div className={styles.showcase}>
          {/* 45:2801 — Item 01 (index inline, overlaps row below) */}
          <div className={styles.item1Row}>
            <p className={styles.itemIndex}>{item1.index}</p>
            <div className={styles.item1Card}>
              <div className={`${styles.imageBox} ${styles.item1Image}`}>
                <Image src={IMG_CAFE} alt={item1.title} fill className={styles.coverImg} />
              </div>
              <div className={styles.itemInfo}>
                <h3 className={styles.itemTitle}>{item1.title}</h3>
                <p className={styles.itemDesc}>{item1.desc}</p>
              </div>
            </div>
          </div>

          {/* 45:2809 — Item 03 (left) + Item 02 (right) */}
          <div className={styles.mainRow}>
            <div className={styles.item3Card}>
              <p className={styles.itemIndex}>{item3.index}</p>
              <div className={`${styles.imageBox} ${styles.item3Image}`}>
                <Image
                  src={IMG_WELLNESS}
                  alt={item3.title}
                  fill
                  className={styles.coverImg}
                />
              </div>
              <div className={styles.itemInfo}>
                <h3 className={styles.itemTitle}>{item3.title}</h3>
                <p className={styles.itemDesc}>{item3.desc}</p>
              </div>
            </div>

            <div className={styles.item2Card}>
              <p className={styles.itemIndex}>{item2.index}</p>
              <div className={`${styles.imageBox} ${styles.item2Image}`}>
                <Image
                  src={IMG_LIBRARY}
                  alt={item2.title}
                  fill
                  className={styles.coverImg}
                />
              </div>
              <div className={styles.itemInfo}>
                <h3 className={styles.itemTitle}>{item2.title}</h3>
                <p className={styles.itemDesc}>{item2.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
