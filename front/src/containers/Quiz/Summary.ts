import { QuizSummary as Component } from "@/components/Quiz/Summary";
import { exitQuiz } from "@/actions/quiz";
import { connect } from "@/connector";

const propMap = ({ quiz: { quiz, score, topScores, answerStats } }, dispatch) => {
  const { questions, questionsOrder, userAnswers } = quiz;
  return {
    quiz,
    questionsOrder,
    questions,
    userAnswers,
    topScores,
    answerStats,
    score,
    exit: () => dispatch(exitQuiz()),
  };
};

export default connect(propMap, Component);
