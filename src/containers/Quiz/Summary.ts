import { QuizSummary as Component } from "@/components/Quiz/Summary"
import { exitQuiz, saveScoreNoStatsQuiz, saveScoreWithStatsQuiz } from '@/actions/quiz'
import { connect } from "@/connector"

const propMap = (
  { quiz: { quizzes, chosenQuiz, score, userAnswers, correctAnswers } }, dispatch
) => {
  const quiz = quizzes[chosenQuiz];
  return {
    quiz,
    score,
    questions: quiz.questions,
    questionsOrder: quiz.questionsOrder,
    userAnswers: userAnswers,
    correctAnswers: correctAnswers,
    saveScoreNoStats: () => { dispatch(saveScoreNoStatsQuiz(), true); dispatch(exitQuiz()); },
    saveScoreWithStats: () => { dispatch(saveScoreWithStatsQuiz(), true); dispatch(exitQuiz()); },
    exit: () => dispatch(exitQuiz()),
  };
};

export default connect(propMap, Component);
