import { QuestionType } from "../types/QuestionType"
import { Options } from "./Options"

type QuestionProps = {
    question: QuestionType,
    answer: number,
    dispatch: React.Dispatch<{
        type: string,
        payload: any,
    }>,
}

export const Question = ({ question, answer, dispatch }: QuestionProps ) => {
    return (
        <div>
            <h4>{question.data.question}</h4>
      <Options question={question} answer={answer} dispatch={dispatch} />
        </div>
    )
}