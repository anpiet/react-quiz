import { useEffect, useReducer } from 'react';
import { Header } from './components/Header';
import { Main } from './Main';
import { createClient } from '@supabase/supabase-js';
import { InitialState } from './types/InitialState';
import { Loader } from './components/Loader';
import { Errors } from './components/Errors';
import { StartScreen } from './components/StartScreen';
import { Question } from './components/Question';
import { NextButton } from './components/NextButton';
import { Progress } from './components/Progress';
import { QuestionType } from './types/QuestionType';
import { FinishScreen } from './components/FinishScreen';
import { Timer } from './components/Timer';

const initialState: InitialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: 10,
  timerStopped: false,
};

const reducer = (state: any, action: { type: string; payload: any }) => {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };
    case 'start':
      return {
        ...state,
        status: 'active',
      };
    case 'finish':
      return {
        ...state,
        status: 'finished',
      };
    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        timerStopped: true,
        points:
          action.payload === question.data.correctOption
            ? state.points + +question.data.points
            : state.points,
      };
    case 'nextQuestion':
      return {
        ...state,
        index: state.index++,
        answer: null,
        timerStopped: false,
        secondsRemaining: initialState.secondsRemaining,
      };
    case 'restart':
      return {
        ...state,
        status: 'ready',
        index: 0,
        answer: null,
        points: 0,
      };
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };

    default:
      throw new Error('Action unknown');
  }
};

export const App = () => {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      secondsRemaining,
      timerStopped,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL as string,
    process.env.REACT_APP_SUPABASE_KEY as string
  );

  const numQuestions = questions.length;
  const totalPoints = questions.reduce(
    (sum: number, current: QuestionType) => sum + current.data.points,
    0
  );

  useEffect(() => {
    const getData = async () => {
      let { data, error } = await supabase.from('quiz').select('data');

      if (error) {
        throw new Error(`Error fetching data:${error}`);
      }

      dispatch({ type: 'dataReceived', payload: data });
    };
    getData();
  }, []);

  return (
    <div className='app'>
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Errors />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              points={points}
              totalPoints={totalPoints}
              index={index}
              numQuestions={numQuestions}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <footer>
              <Timer
                dispatch={dispatch}
                secondsRemaining={secondsRemaining}
                timerStopped={timerStopped}
              />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </footer>
          </>
        )}
        {status === 'finished' && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
};
