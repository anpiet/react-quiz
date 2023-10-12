type NextButtonProps = {
    answer: number,
    index: number,
    numQuestions: number,
    dispatch: React.Dispatch<{
    type: string,
    payload: any,
}>,
}

export const NextButton = ({dispatch, answer, index, numQuestions}: NextButtonProps ) => {
if (answer === null) {
    return null
}
    if (index !== numQuestions - 1) {
        return (
            <button className="btn btn-ui" onClick={() => dispatch({type: 'nextQuestion', payload: null})}>Next</button>
        )
    } else {
        return (
            <button className="btn btn-ui" onClick={() => dispatch({type: 'finish', payload: null})}>Finish</button>
           )
    }


   
}