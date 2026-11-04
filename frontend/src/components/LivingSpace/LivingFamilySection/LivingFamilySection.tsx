import React from 'react';
import Image from 'next/image';
import styles from './LivingFamilySection.module.css';

interface FamilyItem {
  index: string;
  title: string;
  desc: string;
}

interface LivingFamilySectionProps {
  dict: {
    title: string;
    desc: string;
    items: FamilyItem[];
  };
}

export default function LivingFamilySection({ dict }: LivingFamilySectionProps) {
  const empty = { index: '', title: '', desc: '' };
  const [item1 = empty, item2 = empty, item3 = empty] = dict?.items || [];

  return (
    <section className={styles.section} data-node-id="45:2851">
      <div className={styles.container}>
        {/* Header Block */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h2 className={styles.title}>{dict.title}</h2>
            <p className={styles.desc}>{dict.desc}</p>
          </div>
        </div>

        {/* Gallery / Staggered Layout */}
        <div className={styles.showcase}>
          {/* Top Row: Item 1 on the Right */}
          <div className={styles.item1Wrapper}>
            <div className={styles.item1Card}>
              <div className={styles.item1Image}>
                <Image
                  src="/images/khong-gian-song/bc4efcbfdd642b1e4d05903bc8201dff444e0d25.png"
                  alt={item1.title}
                  fill
                  className={styles.coverImg}
                />
              </div>
              <div className={styles.itemInfo}>
                <h3 className={styles.itemTitle}>{item1.title}</h3>
                <p className={styles.itemDesc}>{item1.desc}</p>
              </div>
            </div>
            <div className={styles.itemIndex}>{item1.index}</div>
          </div>

          {/* Bottom Grid: Item 2 on Left, Item 3 on Right */}
          <div className={styles.mainGrid}>
            {/* Item 2 (Giao điểm tinh hoa) */}
            <div className={styles.item2Card}>
              <div className={styles.itemIndex}>{item2.index}</div>
              <div className={styles.item2Image}>
                <Image
                  src="/images/khong-gian-song/616deddf1e219b74f0c1809a0167690e91ec24a1.png"
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

            {/* Item 3 (Góc an tĩnh) */}
            <div className={styles.item3Card}>
              <div className={styles.itemIndex}>{item3.index}</div>
              <div className={styles.item3Image}>
                <Image
                  src="/images/khong-gian-song/7b223d1713aa69206f85b5da96b9a75e235b9ee2.png"
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
          </div>
        </div>
      </div>
    </section>
  );
}
