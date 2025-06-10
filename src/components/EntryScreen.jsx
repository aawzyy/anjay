// src/components/EntryScreen.jsx

import React from 'react';
import { motion } from 'framer-motion';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#1a1a2e', // Warna gelap yang elegan
    color: 'white',
    fontFamily: "'system-ui', 'sans-serif'",
    textAlign: 'center',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  button: {
    fontSize: '1.5rem',
    padding: '15px 30px',
    borderRadius: '50px',
    border: '2px solid white',
    backgroundColor: 'transparent',
    color: 'white',
    cursor: 'pointer',
    marginTop: '2rem',
  },
};

// Komponen ini akan memanggil fungsi onEnter saat tombol diklik
const EntryScreen = ({ onEnter }) => {
  return (
    <motion.div
      style={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} // Animasi saat komponen hilang
      transition={{ duration: 1 }}
    >
      <motion.h1 
        style={styles.title}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Hai Paula, Ada Sesuatu Untukmu...
      </motion.h1>
      
      <motion.button
        style={styles.button}
        onClick={onEnter}
        whileHover={{ scale: 1.1, backgroundColor: '#e94560' }}
        whileTap={{ scale: 0.9 }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        ✨ Klik Untuk Lihat Kejutan ✨
      </motion.button>
    </motion.div>
  );
};

export default EntryScreen;