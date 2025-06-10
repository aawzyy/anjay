// src/App.jsx

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import BirthdayPage from './components/BirthdayPage';
import VideoPlayer from './components/VideoPlayer';
import EntryScreen from './components/EntryScreen';

function App() {
  const [appState, setAppState] = useState('entry'); // State awal: 'entry'

  const handleEnter = () => {
    setAppState('video'); // Setelah klik, ganti ke 'video'
  };

  const handleVideoFinish = () => {
    setAppState('birthday'); // Setelah video, ganti ke 'birthday'
  };

  return (
    <AnimatePresence mode="wait">
      {appState === 'entry' && (
        <EntryScreen key="entry" onEnter={handleEnter} />
      )}

      {appState === 'video' && (
        <VideoPlayer key="video" onFinish={handleVideoFinish} />
      )}

      {appState === 'birthday' && (
        <BirthdayPage key="birthday" />
      )}
    </AnimatePresence>
  );
}

export default App;