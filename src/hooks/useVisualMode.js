import { useState } from 'react';

export default function useVisualMode(initialMode) {
  const [ mode, setMode ] = useState(initialMode);
  const [ history, setHistory ] = useState([ initialMode ]);

  function transition(newMode, replace = false) {
    if (replace) {
      setHistory((prevHistory) => {
        prevHistory[0] = newMode;
        return prevHistory;
      });
    } else {
      setHistory((prevHistory) => {
        return [ newMode, ...prevHistory ];
      });
    }
    setMode(newMode);
    // console.log('transitioned to => ', newMode);
  }

  function back() {
    const newHistory = [ ...history ];
    newHistory.shift();
    setMode(newHistory[0]);
    setHistory(newHistory);
  }

  return { mode, transition, back };
}
