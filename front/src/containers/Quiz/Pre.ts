import { QuizPre as Component } from "@/components/Quiz/Pre";
import { loadQuizDetails, solveQuiz } from "@/actions/quiz";
import { connect } from "@/connector";

const propMap = (
  {
    quiz: {
      quiz,
      chosenQuiz,
      quizStartedLoading,
      quizStarted,
      quizStartedAt,
      quizFinished,
      quizFinishedAt,
      questionTimes,
      userAnswers,
      quizAnswersSent,
    },
  },
  dispatch
) => {
  const timeElapsed = quizFinishedAt - quizStartedAt;
  const answers = Object.entries(userAnswers || {}).map(([questionId, answer]) => ({
    questionId: parseInt(questionId),
    answer,
    timeFraction: ((questionTimes[questionId] / timeElapsed) * 100).toFixed(3),
  }));
  return {
    loadQuizDetails: () => dispatch(loadQuizDetails(dispatch, chosenQuiz)),
    quizSolved: quiz.userAnswers && Object.keys(quiz.userAnswers).length > 0,
    quizStartedLoading,
    quizStarted,
    quizFinished,
    quizAnswersSent,
    // @ts-ignore
    sendAnswers: () => dispatch(solveQuiz(dispatch, quiz.id, answers)),
  };
};

export default connect(propMap, Component);
