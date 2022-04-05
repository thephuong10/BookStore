import React, { useEffect, useRef, useState } from "react";

const getTimeRemaining = (endTime) => {
  const t = (Date.parse(endTime) - Date.parse(new Date())) / 1000;
  // 1p = (60 * 1000)ms -> 1ms = 1/60000s
  return {
    sec: Math.floor(t % 60),
    minutes: Math.floor((t / 60) % 60),
  };
};
const Usecountdown = ({ miliSec = 0, repeat = 1000 }) => {
  const [time, setTime] = useState(() =>
    getTimeRemaining(new Date(Date.parse(new Date()) + miliSec))
  );
  const timerRef = useRef();
  useEffect(() => {
    if (miliSec) {
      const date = new Date(Date.parse(new Date()) + miliSec);
      timerRef.current = setInterval(() => {
        const timeNew = getTimeRemaining(date);
        setTime(timeNew);
        timeNew.minutes === 0 &&
          timeNew.sec === 0 &&
          clearInterval(timerRef.current);
      }, repeat);
    }
    return () => {
      timerRef.current && clearInterval(timerRef.current);
    };
  }, []);
  return time;
};

export default Usecountdown;
