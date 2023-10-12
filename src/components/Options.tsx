import { QuestionType } from "../types/QuestionType"
import cn from "classnames"

type OptionsProps = {
question: QuestionType,
answer: number,
dispatch: React.Dispatch<{
    type: string,
    payload: any,
}>,
}

export const Options = ({question, answer, dispatch}: OptionsProps ) => {
    return (
        <div className="options">
        {question.data.options.map((option, index) => (
            <button
            onClick={() => dispatch({ type: 'newAnswer', payload: index})}
            key={option}
            disabled={answer !== null}
            className={cn("btn btn-option",{
                'answer':index === answer,
                'correct': index === question.data.correctOption && answer !== null,
                'wrong': index !== question.data.correctOption && answer !== null

            })}>{option}</button>
        ))}
    </div>
    )
}