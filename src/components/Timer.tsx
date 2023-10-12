import { useEffect } from 'react';

type TimerProps = {
  secondsRemaining: number;
  dispatch: React.Dispatch<{
    type: string;
    payload: any;
  }>;
};

export const Timer = ({ dispatch, secondsRemaining }: TimerProps) => {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining - minutes * 60;
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'tick', payload: null });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);
  return (
    <div className='timer'>
      {minutes < 10 && '0'}
      {minutes} : {seconds < 10 && '0'}
      {seconds}
    </div>
  );
};
