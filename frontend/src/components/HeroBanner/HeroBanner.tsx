import React from 'react';
import styles from './HeroBanner.module.css';
import Image from 'next/image';

export default function HeroBanner({ dict }: { dict: any }) {
  return (
    <section className={styles.heroSection}>
      {/* Background Image & Overlay */}
      <div className={styles.bgWrapper}>
        <Image
          src="/images/hero-bg.png"
          alt="Legacy Lakeside Estate"
          fill
          priority
          unoptimized
          className={styles.bgImage}
        />
        <div className={styles.bgOverlay} />
      </div>



      {/* Main Content (constrained by container) */}
      <div className={`container ${styles.content}`}>
        <div className={styles.titleArea}>
          {/* Logo Row */}
          <div className={styles.logoRow}>
            <span><svg xmlns="http://www.w3.org/2000/svg" width="53" height="12" viewBox="0 0 53 12" fill="none">
              <path d="M4.9036 11.2255L0 0H1.72196L6.23202 10.5653H5.64147L10.1678 0H11.7422L6.83862 11.2255H4.90333H4.9036Z" fill="white" />
              <path d="M18.2207 11.2255V0H19.7951V11.2255H18.2207Z" fill="white" />
              <path d="M27.3877 11.2255V0H36.3255V1.24202H28.9784V4.79515H35.7349V6.0059H28.9784V9.98346H36.3255V11.2255H27.3877Z" fill="white" />
              <path d="M46.9851 11.2255V1.25779H42.5405V0H52.9875V1.25779H48.5595V11.2255H46.9851Z" fill="white" />
            </svg></span>
            <Image
              src="/images/logo.png"
              alt="Viet Tri Logo"
              width={122}
              height={54}
              className={styles.centerLogo}
              unoptimized
            />
            <span><svg xmlns="http://www.w3.org/2000/svg" width="37" height="12" viewBox="0 0 37 12" fill="none">
              <path d="M4.44457 11.2255V1.25779H0V0H10.4469V1.25779H6.01896V11.2255H4.44457Z" fill="white" />
              <path d="M17.0566 11.2255V0H23.3378C24.0372 0 24.655 0.117871 25.1911 0.353606C25.7266 0.589341 26.1423 0.93813 26.4377 1.39918C26.7328 1.86049 26.8804 2.42096 26.8804 3.0814C26.8804 3.5951 26.782 4.05614 26.5852 4.46507C26.3885 4.874 26.1179 5.20943 25.7733 5.47135C25.429 5.73355 25.0272 5.90648 24.5679 5.99013L24.4695 5.81721C24.9176 5.90113 25.2702 6.01365 25.5274 6.1553C25.7843 6.29669 25.9837 6.48806 26.126 6.72914C26.2679 6.97049 26.3992 7.27946 26.5198 7.65685L27.5856 11.2257H25.9129L24.929 7.86131C24.8085 7.42111 24.6173 7.09878 24.3551 6.89432C24.0928 6.68986 23.7482 6.58776 23.3221 6.58776H18.6318V11.2257H17.0574L17.0566 11.2255ZM18.631 5.34547H23.0095C23.4688 5.34547 23.8624 5.26182 24.1904 5.09397C24.5182 4.92666 24.7724 4.6853 24.9529 4.37072C25.1333 4.05614 25.2234 3.67902 25.2234 3.23882C25.2234 2.60993 25.0266 2.12002 24.6329 1.76882C24.2393 1.41762 23.6982 1.24202 23.0093 1.24202H18.6307L18.631 5.34547Z" fill="white" />
              <path d="M34.5713 11.2255V0H36.1457V11.2255H34.5713Z" fill="white" />
            </svg></span>
          </div>

          <div className={styles.titleWrapper}>
            <div className={styles.lineLeft} />
            <Image src="/images/legacy.png" alt="Legacy Lakeside" width={363} height={27} className={styles.mainTitleImage} />
            <div className={styles.lineRight} />
          </div>

          <p className={styles.description}>
            {dict.desc}
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.mouseIconWrapper}>
            <div className={styles.mouseIcon}>
              <div className={styles.mouseWheel} />
            </div>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" className={styles.chevron}>
              <path d="M2 2L8 8L14 2" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <svg width="200" height="200" className={styles.curvedTextSvg}>
            <defs>
              <mask id="mouseMask">
                {/* White area is visible */}
                <rect width="200" height="200" fill="white" />
                {/* Black area (circle at the mouse icon) hides the text */}
                <circle cx="100" cy="25" r="30" fill="black" />
              </mask>
            </defs>
            <g mask="url(#mouseMask)">
              {/* Full circle centered at 100,100 with radius 85 */}
              <path id="scrollCurve" d="M 100 15 A 85 85 0 0 1 100 185 A 85 85 0 0 1 100 15" fill="transparent" />
              <text fill="rgba(255, 255, 255, 0.45)" fontSize="13px" fontFamily="var(--font-geist-sans), Arial, sans-serif" fontWeight="500" letterSpacing="4px">
                <textPath href="#scrollCurve" startOffset="0" textLength="530" lengthAdjust="spacing">
                  {dict.scroll}
                </textPath>
              </text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
