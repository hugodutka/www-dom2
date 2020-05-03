import { QuizQuestion as Component } from "@/components/Quiz/Question"
import { finishQuiz, exitQuiz, chooseQuestionQuiz, } from '@/actions/quiz'
import { connect } from "@/renderer"

const propMap = ({ quiz: { quizzes, chosenQuiz, chosenQuestion, quizStartedAt } }, dispatch) => {
  const quiz = quizzes[chosenQuiz];
  const question = quiz.questions[chosenQuestion];
  const questionIndex = quiz.questionsOrder.indexOf(chosenQuestion);
  const numberOfQuestions = quiz.questionsOrder.length;
  return {
    quiz,
    question: question.question,
    penalty: question.penalty,
    questionNumber: questionIndex + 1,
    numberOfQuestions,
    userAnswer: null,
    startTime: quizStartedAt,
    typeAnswer: (e) => { console.log(e) },
    next: () => dispatch(chooseQuestionQuiz(quiz.questionsOrder[questionIndex + 1])),
    previous: () => dispatch(chooseQuestionQuiz(quiz.questionsOrder[questionIndex - 1])),
    finish: () => dispatch(finishQuiz()),
    exit: () => dispatch(exitQuiz()),
  }
};

export default connect(propMap, Component);
