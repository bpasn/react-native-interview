interface IQuestion {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];

}

interface IResponseAPIModel {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];

}
interface IResponseAPI {
    response_code: number;
    results: IResponseAPIModel[];
}