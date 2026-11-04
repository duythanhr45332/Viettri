'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import styles from './GalleryBanner.module.css';

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function GalleryBanner({ dict }: { dict: any }) {
  const quote = Array.isArray(dict.quotes) ? dict.quotes[0] : dict.quote || '"Sống chậm, sống sâu, sống trọn vẹn"';
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(70);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      const videoDuration = video.duration || duration || 70;
      if (videoDuration > 0) {
        setProgress((video.currentTime / videoDuration) * 100);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChange = () => setIsMuted(video.muted);

    // Kiểm tra trạng thái ban đầu nếu video đã load/autoplay
    if (video.readyState >= 1 && video.duration && !isNaN(video.duration)) {
      setDuration(video.duration);
    }
    setIsPlaying(!video.paused);
    setIsMuted(video.muted);

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('volumechange', handleVolumeChange);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [duration]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const bar = progressRef.current;
    if (!video || !bar) return;
    const totalDuration = video.duration || duration || 70;
    if (!totalDuration) return;

    const rect = bar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, x / rect.width));
    video.currentTime = percent * totalDuration;
    setCurrentTime(video.currentTime);
    setProgress(percent * 100);
  }, [duration]);

  return (
    <section className={styles.section}>
      <div className={styles.bgWrapper}>
        <video
          ref={videoRef}
          className={styles.bgVideo}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/GalleryBanner.jpg"
        >
          <source src="/images/introvideo.mp4" type="video/mp4" />
        </video>
      </div>

      <div className={styles.overlay}>
        <div className={styles.topContent}>
          <p className={styles.quote}>{quote}</p>

          <div className={styles.audioControls}>
            <span className={styles.timeDisplay}>
              {formatTime(currentTime)} / {formatTime(duration || 70)}
            </span>

            <button
              className={styles.controlBtn}
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="4" width="4" height="16" rx="1" fill="#242424" />
                  <rect x="14" y="4" width="4" height="16" rx="1" fill="#242424" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M18.1562 8.94455L6.9 2.05862C6.71022 1.94241 6.49287 1.87897 6.27037 1.87485C6.04788 1.87073 5.82832 1.92608 5.63438 2.03518C5.44227 2.14259 5.28225 2.29923 5.17075 2.48899C5.05926 2.67875 5.00032 2.89478 5 3.11487V16.8852C5.00145 17.2153 5.13393 17.5314 5.36833 17.7639C5.60273 17.9964 5.91986 18.1263 6.25 18.125C6.48043 18.1249 6.70639 18.0614 6.90313 17.9414L18.1562 11.0555C18.3371 10.9452 18.4866 10.7903 18.5904 10.6056C18.6941 10.4209 18.7486 10.2126 18.7486 10.0008C18.7486 9.78897 18.6941 9.58069 18.5904 9.39599C18.4866 9.21129 18.3371 9.05637 18.1562 8.94612V8.94455ZM6.25 16.8703V3.12502L17.4867 10L6.25 16.8703Z" fill="#242424" />
                </svg>
              )}
            </button>

            <button
              className={styles.controlBtn}
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4.375 7.5V12.5C4.375 12.6658 4.30915 12.8247 4.19194 12.9419C4.07473 13.0592 3.91576 13.125 3.75 13.125C3.58424 13.125 3.42527 13.0592 3.30806 12.9419C3.19085 12.8247 3.125 12.6658 3.125 12.5V7.5C3.125 7.33424 3.19085 7.17527 3.30806 7.05806C3.42527 6.94085 3.58424 6.875 3.75 6.875C3.91576 6.875 4.07473 6.94085 4.19194 7.05806C4.30915 7.17527 4.375 7.33424 4.375 7.5ZM6.875 1.875C6.70924 1.875 6.55027 1.94085 6.43306 2.05806C6.31585 2.17527 6.25 2.33424 6.25 2.5V17.5C6.25 17.6658 6.31585 17.8247 6.43306 17.9419C6.55027 18.0592 6.70924 18.125 6.875 18.125C7.04076 18.125 7.19973 18.0592 7.31694 17.9419C7.43415 17.8247 7.5 17.6658 7.5 17.5V2.5C7.5 2.33424 7.43415 2.17527 7.31694 2.05806C7.19973 1.94085 7.04076 1.875 6.875 1.875ZM10 4.375C9.83424 4.375 9.67527 4.44085 9.55806 4.55806C9.44085 4.67527 9.375 4.83424 9.375 5V15C9.375 15.1658 9.44085 15.3247 9.55806 15.4419C9.67527 15.5592 9.83424 15.625 10 15.625C10.1658 15.625 10.3247 15.5592 10.4419 15.4419C10.5592 15.3247 10.625 15.1658 10.625 15V5C10.625 4.83424 10.5592 4.67527 10.4419 4.55806C10.3247 4.44085 10.1658 4.375 10 4.375ZM13.125 6.875C12.9592 6.875 12.8003 6.94085 12.6831 7.05806C12.5658 7.17527 12.5 7.33424 12.5 7.5V12.5C12.5 12.6658 12.5658 12.8247 12.6831 12.9419C12.8003 13.0592 12.9592 13.125 13.125 13.125C13.2908 13.125 13.4497 13.0592 13.5669 12.9419C13.6842 12.8247 13.75 12.6658 13.75 12.5V7.5C13.75 7.33424 13.6842 7.17527 13.5669 7.05806C13.4497 6.94085 13.2908 6.875 13.125 6.875ZM16.25 5.625C16.0842 5.625 15.9253 5.69085 15.8081 5.80806C15.6908 5.92527 15.625 6.08424 15.625 6.25V13.75C15.625 13.9158 15.6908 14.0747 15.8081 14.1919C15.9253 14.3092 16.0842 14.375 16.25 14.375C16.4158 14.375 16.5747 14.3092 16.6919 14.1919C16.8092 14.0747 16.875 13.9158 16.875 13.75V6.25C16.875 6.08424 16.8092 5.92527 16.6919 5.80806C16.5747 5.69085 16.4158 5.625 16.25 5.625Z" fill={isMuted ? 'rgba(36,36,36,0.4)' : '#242424'} />
              </svg>
            </button>
          </div>
        </div>

        <div
          className={styles.progressBar}
          ref={progressRef}
          onClick={handleProgressClick}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  );
}
