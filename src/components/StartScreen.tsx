type StartScreenProps = {
numQuestions: number,
dispatch: React.Dispatch<{
    type: string,
    payload: any,
}>,
}

export const StartScreen = ({numQuestions, dispatch }: StartScreenProps ) => {
    return (
        <div className="start">
            <h2>Welcome to the React Quiz!</h2>
            <h3>{numQuestions} questions to test your React mastery</h3>
            <button onClick={() => dispatch({type: 'start', payload: {}})} className="btn btn-ui">Let's start!</button>
        </div>
    )
}