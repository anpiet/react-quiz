type FinishScreenProps = {
totalPoints: number,
points: number,
dispatch: React.Dispatch<{
    type: string,
    payload: any,
}>,
}

export const FinishScreen = ({totalPoints, points, dispatch}: FinishScreenProps ) => {
    const percent = Math.ceil(points / totalPoints * 100);

    let emoji;

    if (percent === 100) {
        emoji = '🤯';
    } else if (percent > 80) {
        emoji = '👍'
    } else if (percent > 50) {
        emoji = '👌'
    } else if (percent > 0) {
        emoji = '😩'
    } else if (percent === 0) {
        emoji = '😤'
    }
    
    return (
        <>
<p className="result">
          {emoji} You scored <strong>{points}</strong> out of {totalPoints} ({percent}%)
        </p>
        <button className="btn btn-ui" onClick={() => dispatch({ type: 'restart', payload: null })}>Restart Quiz</button>
        </>
      

    )
}