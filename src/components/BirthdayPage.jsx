// src/components/BirthdayPage.jsx

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Marquee from "react-fast-marquee";
import ConfettiRain from './ConfettiRain';

// --- DATA UCAPAN ---
const messages = [
  { sender: 'Kak OYE', text: 'Selamat ulang tahun sahabatku! Semoga semua impianmu terwujud. Aamiin!' },
  { sender: 'SARAAAA', text: 'HBD bro! Makin jago main badminnya, jangan lupa traktirannya!' },
  { sender: 'Editor Rafli', text: 'Happy birthday! Wish you all the best, sehat dan bahagia selalu yaa.' },
  { sender: 'Dandre CIA', text: 'Wooy, selamat bertambah tua! Semoga makin bijaksana dan dompetnya makin tebel.' },
  { sender: 'om jangek', text: 'Sehat selalu, diperbanyak rezekinya laa.' },
  { sender: 'OJI', text: 'Met ultah! Sukses terus buat project-project barunya!' },
  { sender: 'Ricky talan', text: 'Happy level up day! Keep shining and be awesome!.' },
];

// --- STYLES LENGKAP UNTUK SEMUA ELEMEN ---
const styles = {
  sectionContent: { padding: '80px 20px', maxWidth: '1200px', margin: '0 auto', overflow: 'hidden' },
  hero: { minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', textShadow: '0px 2px 10px rgba(0, 0, 0, 0.7)', },
  heroVideo: { position: 'absolute', top: '50%', left: '50%', width: '100%', height: '100%', objectFit: 'cover', transform: 'translate(-50%, -50%)', zIndex: -2, },
  heroOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: -1, },
  h1: { fontSize: '3rem', margin: 0, textAlign: 'center' },
  h2: { fontSize: '5rem', margin: '0 0 1rem 0', color: '#FFFFFF', textAlign: 'center' },
  sectionTitle: { fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' },
  fullPhotoSection: { height: '90vh', position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', },
  fullPhotoImage: { position: 'absolute', top: 0, left: 0, width: '100%', height: '140%', backgroundImage: `url('/foto-utama.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', },
  fullPhotoText: { position: 'relative', color: 'white', fontSize: '4rem', fontWeight: 'bold', textShadow: '0 4px 15px rgba(0, 0, 0, 0.8)', textAlign: 'center', },
  gallery: { display: 'flex', justifyContent: 'center', gap: '25px', flexWrap: 'wrap' },
  imgContainer: { width: '300px', textAlign: 'center' },
  img: { width: '100%', height: '300px', objectFit: 'cover', borderRadius: '15px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' },
  caption: { marginTop: '10px', fontStyle: 'italic', color: '#555' },
  footer: { marginTop: '4rem', color: '#777', textAlign: 'center' },
  messageCard: { backgroundColor: '#FFFFFF', borderRadius: '15px', padding: '20px 25px', margin: '0 15px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', width: '350px', display: 'flex', flexDirection: 'column', },
  messageText: { fontSize: '1rem', fontStyle: 'italic', flexGrow: 1, marginBottom: '15px', },
  messageSender: { fontWeight: 'bold', textAlign: 'right', color: '#6a4c93', },
};

// --- VARIANTS ANIMASI ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.3, }, }, };
const heroTextVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 10 } }, };
const galleryItemVariants = { hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 12 } }, };

// --- KOMPONEN FullPhotoSection ---
const FullPhotoSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <motion.section ref={ref} style={styles.fullPhotoSection}>
      <motion.div style={{ ...styles.fullPhotoImage, y, scale }} />
      <motion.h2
        style={styles.fullPhotoText}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        The Star of The Day
      </motion.h2>
    </motion.section>
  );
};

const BirthdayPage = () => {
  const [isClient, setIsClient] = useState(false);
  const [isConfettiActive, setIsConfettiActive] = useState(true);
  const [isHeroTextVisible, setIsHeroTextVisible] = useState(true);

  useEffect(() => {
    setIsClient(true);
    const confettiTimer = setTimeout(() => setIsConfettiActive(false), 8000);
    const heroTextTimer = setTimeout(() => setIsHeroTextVisible(false), 5000);
    return () => {
      clearTimeout(confettiTimer);
      clearTimeout(heroTextTimer);
    };
  }, []);

  return (
    <div className="page-container-enter">
      {isClient && isConfettiActive && <ConfettiRain />}

      {/* Bagian 1: Hero Section */}
      <motion.div style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <video src="/hero-bg.mp4" autoPlay loop style={styles.heroVideo}></video>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isHeroTextVisible ? "visible" : "hidden"}
          transition={{ duration: 1 }}
          style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <motion.h1 variants={heroTextVariants} style={styles.h1}>SELAMAT ULANG TAHUN,</motion.h1>
          <motion.h2 variants={heroTextVariants} style={styles.h2}>PAULA PETRICIA!</motion.h2>
          <motion.p variants={heroTextVariants}>Semoga panjang umur, dan banyak DUIT terus!</motion.p>
        </motion.div>
      </motion.div>

      {/* Bagian 2: Foto Besar dengan Parallax */}
      <FullPhotoSection />

      {/* Bagian 3: Galeri Foto */}
      <motion.div style={styles.sectionContent} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants}>
        <motion.h3 variants={heroTextVariants} style={styles.sectionTitle}>Foto foto nih</motion.h3>
        <div style={styles.gallery}>
          <motion.div variants={galleryItemVariants} style={styles.imgContainer}><img src="/foto1.jpg" alt="Momen lucu 1" style={styles.img} /><p style={styles.caption}>"Ekspresi ketika melihat diskon 99%."</p></motion.div>
          <motion.div variants={galleryItemVariants} style={styles.imgContainer}><img src="/foto2.jpg" alt="Momen lucu 2" style={styles.img} /><p style={styles.caption}>"Bakso?? bakso mana bakso."</p></motion.div>
          <motion.div variants={galleryItemVariants} style={styles.imgContainer}><img src="/foto3.jpg" alt="Momen lucu 3" style={styles.img} /><p style={styles.caption}>"Diet?? apa itu?."</p></motion.div>
          <motion.div variants={galleryItemVariants} style={styles.imgContainer}><img src="/foto4.jpg" alt="Momen lucu 4" style={styles.img} /><p style={styles.caption}>"HULK!!!."</p></motion.div>
          <motion.div variants={galleryItemVariants} style={styles.imgContainer}><img src="/foto5.jpg" alt="Momen lucu 5" style={styles.img} /><p style={styles.caption}>"Kerja mulu neng party lah."</p></motion.div>
          <motion.div variants={galleryItemVariants} style={styles.imgContainer}><img src="/foto6.jpg" alt="Momen lucu 6" style={styles.img} /><p style={styles.caption}>"Sporty GIRLL!!!."</p></motion.div>
          <motion.div variants={galleryItemVariants} style={styles.imgContainer}><img src="/foto7.jpg" alt="Momen lucu 7" style={styles.img} /><p style={styles.caption}>"Mode FOKUS DIAM KLEAN."</p></motion.div>
          <motion.div variants={galleryItemVariants} style={styles.imgContainer}><img src="/foto8.jpg" alt="Momen lucu 8" style={styles.img} /><p style={styles.caption}>"Safety can be fun right?."</p></motion.div>
          <motion.div variants={galleryItemVariants} style={styles.imgContainer}><img src="/foto9.jpg" alt="Momen lucu 9" style={styles.img} /><p style={styles.caption}>"Mode capek."</p></motion.div>

        </div>
      </motion.div>

      {/* Bagian 4: Marquee Ucapan */}
      <motion.div style={styles.sectionContent} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: "easeOut" }}>
        <h3 style={styles.sectionTitle}>Ucapan & Doa Dari Kami Semua</h3>
        <Marquee gradient={true} gradientColor={[255, 255, 255]} gradientWidth={50} speed={40} pauseOnHover={true}>
          {messages.map((msg, index) => (
            <div key={index} style={styles.messageCard}>
              <p style={styles.messageText}>"{msg.text}"</p>
              <p style={styles.messageSender}>- {msg.sender}</p>
            </div>
          ))}
        </Marquee>
      </motion.div>

      {/* Bagian 5: Penutup */}
      <motion.div style={{ ...styles.sectionContent, ...styles.footer }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 1 }}>
        <p>From your best friend,</p>
        <h3 style={{ fontSize: '2rem' }}>SEMUA TEMAN MU</h3>
      </motion.div>
    </div>
  );
};

export default BirthdayPage;