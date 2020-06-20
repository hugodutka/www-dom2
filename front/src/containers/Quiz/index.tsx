import { Quiz as Component } from "@/components/Quiz";
import { connect } from "@/connector";

const propMap = ({ quiz: { chosenQuiz, quizStarted, quizFinished } }, _dispatch) => ({
  isQuizChosen: chosenQuiz !== null,
  isQuizStarted: quizStarted,
  isQuizFinished: quizFinished,
});

export default connect(propMap, Component);
