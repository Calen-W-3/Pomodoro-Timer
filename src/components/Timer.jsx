import { useEffect, useState, useRef } from "react";

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 mins in seconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const timerAudio = new Audio('/src/assets/alarm-clock-beep.mp3')

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            timerAudio.play()
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };
  const resetTimer = () => {
    stopTimer();
    setTimeLeft(25 * 60);
  };


  return (
  <div className="min-h-screen w-full bg-gradient-to-bl from-red-400 to-red-900 flex items-center justify-center text-white ">
    <div className="flex flex-col items-center gap-4 bg-white/20 px-6 py-6 rounded-xl">
      <h1 className="text-4xl font-bold mb-4">Focus Timer</h1>
      
      <div className="text-6xl mb-6">{formatTime(timeLeft)}</div>
      <div className="flex space-x-4 font-bold">
        <button
          onClick={startTimer}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
        >
          Start
        </button>
        <button
          onClick={stopTimer}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 cursor-pointer"
        >
          Stop
        </button>
        <button
          onClick={resetTimer}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
        >
          Restart
        </button>
      </div>
    </div>
  </div>
  );
}
