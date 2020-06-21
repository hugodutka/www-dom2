import { QuizPre as Component } from "@/components/Quiz/Pre";
import { loadQuizDetails } from "@/actions/quiz";
import { connect } from "@/connector";

const propMap = ({ quiz: { quizzes, chosenQuiz, quizStartedLoading } }, dispatch) => ({
  loadQuizDetails: () => dispatch(loadQuizDetails(dispatch, chosenQuiz)),
  quizLoaded: Boolean(quizzes[chosenQuiz]),
  quizStartedLoading,
});

export default connect(propMap, Component);
