// src/components/ConfettiRain.jsx

import React from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

const ConfettiRain = () => {
  // Hook ini sekarang aman karena komponen ini hanya akan dirender di browser
  const { width, height } = useWindowSize();

  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={300}
      recycle={false}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000 }}
    />
  );
};

export default ConfettiRain;