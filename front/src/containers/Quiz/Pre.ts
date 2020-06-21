import { QuizPre as Component } from "@/components/Quiz/Pre";
import { loadQuizDetails } from "@/actions/quiz";
import { connect } from "@/connector";

const propMap = ({ quiz: { quiz, chosenQuiz, quizStartedLoading, quizStarted } }, dispatch) => ({
  loadQuizDetails: () => dispatch(loadQuizDetails(dispatch, chosenQuiz)),
  quizSolved: quiz.userAnswers && Object.keys(quiz.userAnswers).length > 0,
  quizStartedLoading,
  quizStarted,
});

export default connect(propMap, Component);
