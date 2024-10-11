import React from 'react';
import { useState, useRef, useEffect } from 'react';

const Time = () => {




    const [time, setTime] = useState(0); // Initial time in seconds (5 minutes)
    const [running, setRunning] = useState(false);
    const [inputMinutes, setInputMinutes] = useState(5); // For adjusting time
    const timerRef = useRef(null);



     // Convert seconds to minutes and seconds display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };


  // Start timer
  const startTimer = () => {
    if (!running && time > 0) {
      setRunning(true);
    }
  };

  // Stop timer
  const stopTimer = () => {
    setRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };


    // Reset timer
    const resetTimer = () => {
        stopTimer();
        setTime(0); // Reset to initial 5 minutes
      };
    

       // Adjust time to custom input (in minutes)
  const adjustTime = () => {
    const adjustedTime = inputMinutes * 60;
    setTime(adjustedTime);
    stopTimer();
  };
  


   // Countdown logic
   useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            setRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [running]);

  
  return (
    <div>

<div className="App">
      <h1>Countdown Timer</h1>
      <div className="timer-display">{formatTime(time)}</div>
      <div className="controls">
        <button onClick={startTimer} disabled={running || time === 0}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>

      <div className="adjust-time">
        <input
          type="number"
          value={inputMinutes}
          onChange={(e) => setInputMinutes(Number(e.target.value))}
          min="1"
          placeholder="Enter minutes"
        />
        <button onClick={adjustTime}>Set Time</button>
      </div>
    </div>

    </div>
  )
}

export default Time