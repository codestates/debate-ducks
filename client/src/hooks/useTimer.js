import { useState, useEffect, useRef } from "react";

export default function useTimer(m, callback) {
  const [min, setMin] = useState(m);
  const [sec, setSec] = useState(0);
  const time = useRef(m * 60);
  const timerId = useRef(null);

  useEffect(() => {
    timerId.current = setInterval(() => {
      setMin(parseInt(time.current / 60));
      setSec(time.current % 60);
      time.current -= 1;
    }, 1000);

    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    if (time.current <= 0) {
      clearInterval(timerId.current);
      callback();
    }
  }, [sec]);

  return [min, sec];
}
