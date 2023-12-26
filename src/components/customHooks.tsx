// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
import * as React from 'react';
import { UseIntervalFunc } from './types';

export const useInterval: UseIntervalFunc = (callback, delay) => {
  const savedCallback: React.MutableRefObject<any> = React.useRef();
  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    // If victory is declared or bomb stop the timer...
    if (delay === -1) {
      return;
    }

    // Otherwise...
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return;
  }, [delay]);
};

export const useIsSsr = () => {
  // we always start off in "SSR mode", to ensure our initial browser render
  // matches the SSR render
  const [isSsr, setIsSsr] = React.useState(true);

  React.useEffect(() => {
    // `useEffect` never runs on the server, so we must be on the client if
    // we hit this block
    setIsSsr(false);
  }, []);

  return isSsr;
};
