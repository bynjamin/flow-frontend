import { useState, useEffect, useCallback } from 'react';

type Options = {
  seconds: number;
};

const useCounter = ({ seconds }: Options) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(seconds);
  const [timeOuted, setTimeouted] = useState<boolean>(false);

  const countDown = useCallback(() => {
    setSecondsLeft(secondsLeft - 1);
  }, [secondsLeft]);

  useEffect(() => {
    if (secondsLeft > 0) {
      setTimeout(countDown, 1000);
    } else {
      setTimeouted(true);
    }
  }, [countDown, secondsLeft]);

  return [secondsLeft, timeOuted];
};

export default useCounter;
