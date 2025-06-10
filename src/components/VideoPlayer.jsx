// src/components/VideoPlayer.jsx

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Kumpulan style untuk memastikan video fullscreen
const styles = {
  // Container utama yang menutupi seluruh layar
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw', // Gunakan 100vw (viewport width) untuk lebar penuh
    height: '100vh', // Gunakan 100vh (viewport height) untuk tinggi penuh
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  // Elemen video itu sendiri
  video: {
    width: '100%',
    height: '100%',
    // Properti paling penting untuk fullscreen tanpa distorsi
    objectFit: 'cover', 
  },
};

const VideoPlayer = ({ onFinish }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef(null);

  // Gunakan useEffect untuk memastikan video.play() dipanggil saat komponen muncul
  useEffect(() => {
    // Tanda tanya (?) adalah optional chaining, untuk keamanan jika ref belum siap
    videoRef.current?.play().catch(error => {
      // Menangani error jika browser tetap memblokir autoplay
      console.error("Autoplay dengan suara dicegah oleh browser:", error);
      // Sebagai fallback, kita bisa langsung selesaikan video agar user tidak terjebak
      onFinish();
    });
  }, [onFinish]); // Tambahkan onFinish sebagai dependency

  const handleVideoEnd = () => {
    setIsFadingOut(true);
    // Beri waktu 1 detik untuk animasi fade-out sebelum memanggil onFinish
    setTimeout(() => onFinish(), 1000);
  };

  return (
    <motion.div
      style={styles.container}
      // Animasikan opacity menggunakan Framer Motion
      initial={{ opacity: 1 }}
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <video
        ref={videoRef}
        style={styles.video}
        playsInline
        onEnded={handleVideoEnd}
        src="/intro-video.mp4" // Pastikan nama file ini benar
        // Atribut 'muted' sudah dihapus agar video bisa bersuara
      />
    </motion.div>
  );
};

export default VideoPlayer;