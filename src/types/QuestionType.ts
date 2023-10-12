export type QuestionType = {
    id: number,
    data: {
    question: string,
    options: ["Angular" | "React" | "Svelte" | "Vue"],
    correctOption: number,
    points: number,
    }
  }
