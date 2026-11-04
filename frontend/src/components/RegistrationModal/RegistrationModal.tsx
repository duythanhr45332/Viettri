'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './RegistrationModal.module.css';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  dict?: {
    title?: string;
    subtitle?: string;
    nameLabel?: string;
    namePlaceholder?: string;
    phoneLabel?: string;
    phonePlaceholder?: string;
    emailLabel?: string;
    emailPlaceholder?: string;
    messageLabel?: string;
    messagePlaceholder?: string;
    submit?: string;
    closeAria?: string;
    thanksTitle?: string;
    thanksText?: string;
    thanksButton?: string;
  };
}

const SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbz4FcuF88WWD3pO4v1qTkJfpzT70QJ9pwfhXKdK3vzEG5oUWdcXGgXc652-lgtlwvq83w/exec';
const SHEET_TOKEN = 'a6c8d523a684e07eb54ea607ab5c4fbc';

export default function RegistrationModal({ isOpen, onClose, dict }: RegistrationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setShowThanks(false), 300);
    }
  }, [isOpen]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Honeypot check
    if (formData.get('website')) {
      form.reset();
      setShowThanks(true);
      return;
    }

    setIsSubmitting(true);

    const data = new URLSearchParams();
    data.append('token', SHEET_TOKEN);
    data.append('website', formData.get('website') as string);
    data.append('name', formData.get('name') as string);
    data.append('phone', formData.get('phone') as string);
    data.append('email', formData.get('email') as string);
    data.append('message', formData.get('message') as string);

    const sheetPromise = fetch(SHEET_ENDPOINT, { 
      method: 'POST', 
      mode: 'no-cors', 
      body: data 
    }).catch(() => {
      // Handle error silently or log it
    });

    // Chuẩn bị dữ liệu gửi về WordPress Contact Form 7
    const wpData = new FormData();
    wpData.append('_wpcf7', '6');
    wpData.append('_wpcf7_unit_tag', 'wpcf7-f6-p1-o1');
    wpData.append('your-name', formData.get('name') as string);
    wpData.append('your-phone', formData.get('phone') as string);
    wpData.append('your-email', formData.get('email') as string);
    wpData.append('your-message', formData.get('message') as string);

    // URL API của CF7. Đã cập nhật định dạng rest_route vì WP đang dùng permalink mặc định.
    const WP_CF7_ENDPOINT = process.env.NEXT_PUBLIC_CF7_ENDPOINT || 'https://viettrilegacylakeside.vn/index.php?rest_route=/contact-form-7/v1/contact-forms/6/feedback';

    const wpPromise = fetch(WP_CF7_ENDPOINT, {
      method: 'POST',
      body: wpData
    }).catch(() => {
      // Handle error silently or log it
    });

    Promise.all([sheetPromise, wpPromise])
      .finally(() => {
        setIsSubmitting(false);
        form.reset();
        setShowThanks(true);
      });
  };

  if (!mounted) return null;

  return createPortal(
    <div className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label={dict?.closeAria || 'Close'}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {!showThanks ? (
          <>
            <h2 className={styles.modalTitle}>{dict?.title || 'Đăng ký tư vấn'}</h2>
            <p className={styles.modalSubtitle}>{dict?.subtitle || 'Vui lòng để lại thông tin, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.'}</p>

            <form onSubmit={handleSubmit}>
              {/* Honeypot field - hidden from real users */}
              <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

              <div className={styles.formGroup}>
                <label htmlFor="reg-name" className={styles.label}>{dict?.nameLabel || 'Họ và tên *'}</label>
                <input type="text" id="reg-name" name="name" className={styles.input} required placeholder={dict?.namePlaceholder || 'Nhập họ và tên của bạn'} />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="reg-phone" className={styles.label}>{dict?.phoneLabel || 'Số điện thoại *'}</label>
                <input type="tel" id="reg-phone" name="phone" className={styles.input} required placeholder={dict?.phonePlaceholder || 'Nhập số điện thoại'} />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="reg-email" className={styles.label}>{dict?.emailLabel || 'Email *'}</label>
                <input type="email" id="reg-email" name="email" className={styles.input} required placeholder={dict?.emailPlaceholder || 'Nhập email'} />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="reg-message" className={styles.label}>{dict?.messageLabel || 'Lời nhắn'}</label>
                <textarea id="reg-message" name="message" className={styles.textarea} placeholder={dict?.messagePlaceholder || 'Nhập nội dung cần tư vấn...'} />
              </div>

              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className={styles.spinner}></div>
                ) : (
                  dict?.submit || 'Gửi thông tin'
                )}
              </button>
            </form>
          </>
        ) : (
          <div className={styles.thanksMessage}>
            <div className={styles.thanksIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className={styles.thanksTitle}>{dict?.thanksTitle || 'Cảm ơn bạn!'}</h2>
            <p className={styles.thanksText}>{dict?.thanksText || 'Thông tin của bạn đã được gửi thành công. Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.'}</p>
            <button className={styles.thanksButton} onClick={onClose}>{dict?.thanksButton || 'Đóng'}</button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
