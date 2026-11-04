'use client';

import { useState } from 'react';
import styles from './PageBlurReveal.module.css';

/**
 * Page-load reveal inspired by understory.framer.website ("Loading" component, framer-nR2cq):
 * a fixed frosted-glass layer (backdrop blur 25px) that clears after 0.5s over 1s,
 * then unmounts so it never costs GPU time while scrolling.
 */
export default function PageBlurReveal() {
  const [done, setDone] = useState(false);
  if (done) return null;
  return <div className={styles.overlay} aria-hidden onAnimationEnd={() => setDone(true)} />;
}
