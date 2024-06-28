import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
function CountdownTimerApp() {
  const [countdownTime, setCountdownTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isPlaying && countdownTime > 0) {
      interval = setInterval(() => setCountdownTime(countdownTime - 1000), 1000);
    } else if (!isPlaying || countdownTime === 0) {
      clearInterval(interval);
      if (countdownTime === 0) audioRef.current.play();
    }
    return () => clearInterval(interval);
  }, [countdownTime, isPlaying]);

  const handleStartStop = () => setIsPlaying(!isPlaying);
  const handleReset = () => setCountdownTime(0);

  const getFormattedTime = () => {
    const minutes = Math.floor(countdownTime / 60000);
    const seconds = Math.floor((countdownTime % 60000) / 1000);
    return `${minutes ? minutes + ':' : ''}${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="countdown-timer-app">
      <h1>Countdown Timer</h1>
      <input
        type="number"
        placeholder="Set duration (minutes or seconds)"
        onChange={(e) => setCountdownTime(e.target.value * 60000)}
      />
      <button onClick={handleStartStop}>{isPlaying ? 'Pause' : 'Start'}</button>
      <button onClick={handleReset}>Reset</button>
      <p>{getFormattedTime()}</p>
      <audio ref={audioRef} src="D:\Learning\1698906139008.mp4" preload="auto" />
    </div>
  );
}

export default CountdownTimerApp;
