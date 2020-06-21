import { QuizSummary as Component } from "@/components/Quiz/Summary";
import { exitQuiz } from "@/actions/quiz";
import { connect } from "@/connector";

const propMap = ({ quiz: { quiz } }, dispatch) => {
  const { questions, questionsOrder, userAnswers } = quiz;
  const correctAnswers = questionsOrder.reduce((acc, id) => {
    acc[id] = userAnswers[id].answer === questions[id].answer;
    return acc;
  }, {});
  return {
    quiz,
    questionsOrder,
    questions,
    userAnswers,
    correctAnswers,
    score: Object.entries(correctAnswers)
      .map(([id, correct]) => userAnswers[id].time / 1000 + (correct ? 0 : questions[id].penalty))
      .reduce((acc, val) => acc + val, 0),
    exit: () => dispatch(exitQuiz()),
  };
};

export default connect(propMap, Component);
