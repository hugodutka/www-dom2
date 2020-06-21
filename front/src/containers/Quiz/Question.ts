import { QuizQuestion as Component } from "@/components/Quiz/Question";
import {
  finishQuiz,
  exitQuiz,
  chooseQuestionQuiz,
  inputAnswerQuiz,
  solveQuiz,
} from "@/actions/quiz";
import { connect } from "@/connector";

const propMap = ({ quiz: { quiz, chosenQuestion, quizStartedAt, userAnswers } }, dispatch) => {
  const question = quiz.questions[chosenQuestion];
  const questionIndex = quiz.questionsOrder.indexOf(chosenQuestion);
  const numberOfQuestions = quiz.questionsOrder.length;
  return {
    quiz,
    question: question.question,
    penalty: question.penalty,
    questionNumber: questionIndex + 1,
    numberOfQuestions,
    userAnswer: userAnswers[chosenQuestion],
    startTime: quizStartedAt,
    allQuestionsAnswered: Object.values(userAnswers).reduce(
      (acc, ans) => acc && ans !== "" && ans !== null,
      true
    ),
    typeAnswer: (e) => dispatch(inputAnswerQuiz(e.target.value)),
    next: () => dispatch(chooseQuestionQuiz(quiz.questionsOrder[questionIndex + 1])),
    previous: () => dispatch(chooseQuestionQuiz(quiz.questionsOrder[questionIndex - 1])),
    finish: () => {
      dispatch(finishQuiz());
      dispatch(
        solveQuiz(
          dispatch,
          quiz.id,
          // @ts-ignore
          Object.entries(userAnswers).map(([questionId, answer]) => ({
            questionId: parseInt(questionId),
            answer,
          }))
        )
      );
    },
    exit: () => dispatch(exitQuiz()),
  };
};

export default connect(propMap, Component);
