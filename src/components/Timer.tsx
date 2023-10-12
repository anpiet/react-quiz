import { useEffect } from 'react';

type TimerProps = {
  secondsRemaining: number;
  timerStopped: boolean;
  dispatch: React.Dispatch<{
    type: string;
    payload: any;
  }>;
};

export const Timer = ({
  dispatch,
  secondsRemaining,
  timerStopped,
}: TimerProps) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!timerStopped) {
      timer = setInterval(() => {
        dispatch({ type: 'tick', payload: null });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [dispatch, timerStopped]);
  return (
    <div className='timer'>
      {secondsRemaining < 10 && '0'}
      {secondsRemaining}
    </div>
  );
};
