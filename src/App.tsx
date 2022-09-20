import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { start, stop } from './features/timerSlice';
import { addLap } from './features/lapSlice';
import { addMinute, resetMinute } from './features/minuteSlice';
import { addSecond, resetSecond } from './features/secondSlice';
import { displayNum } from './helper/DisplayNum';
import LapCard from './components/LapCard';
import { addMillisecond, resetMillisecond } from './features/millisecondSlice';

let time: any;

function App() {
  const { millisecond } = useSelector((state: RootState) => state.milliseconds);
  const { minute } = useSelector((state: RootState) => state.minutes);
  const { second } = useSelector((state: RootState) => state.seconds);
  const { timer } = useSelector((state: RootState) => state.timer);
  const { lap } = useSelector((state: RootState) => state.laps);

  const dispatch = useDispatch();

  useEffect(() => {
    if (millisecond === 100) {
      dispatch(resetMillisecond());
      dispatch(addSecond());
    }

    if (second === 60) {
      dispatch(addMinute());
      dispatch(resetSecond());
    }
  }, [millisecond, second, timer, dispatch]);

  const startTimer = () => {
    return (time = setInterval(() => {
      dispatch(start());
      dispatch(addMillisecond());
    }, 10));
  };

  const handlePause = () => {
    clearInterval(time);
    dispatch(stop());
  };

  const handleAddLap = () => {
    const newLap = {
      id: lap.length,
      millisecond,
      minute,
      second
    };
    dispatch(addLap(newLap));
  };

  const handleReset = () => {
    dispatch(resetMinute());
    dispatch(resetSecond());
    dispatch(resetMillisecond());
    dispatch(stop());
    clearInterval(time);
  };

  return (
    <div className="app">
      <h1 className="title">Stopwatch</h1>
      <div className="timerFrame">
        <h1 className="time">
          {minute > 0 ? displayNum(minute) + ':' : null}
          {displayNum(second)}.
          <span className="millisecond">{displayNum(millisecond)}</span>
        </h1>
      </div>
      {timer ? (
        <div className="pause__lap__btn__container">
          <button className="pause__btn" onClick={handlePause}>
            Pause
          </button>
          <button className="lap__btn" onClick={handleAddLap}>
            Lap
          </button>
        </div>
      ) : (
        <div className="start__resume__btn__container">
          <button onClick={startTimer}>Start</button>
        </div>
      )}

      <button className="reset__btn" onClick={handleReset}>
        Reset
      </button>
      <div className="lap__container">
        {lap &&
          lap.map((lap) => (
            <LapCard
              id={lap.id}
              minute={lap.minute}
              second={lap.second}
              millisecond={lap.millisecond}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
