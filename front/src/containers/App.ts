import { App as Component } from "@/components/App"
import { connect } from "@/connector"

const propMap = ({ quiz: { chosenQuiz, quizStarted, quizFinished } }, dispatch) => (
  {
    isQuizChosen: chosenQuiz !== null,
    isQuizStarted: quizStarted,
    isQuizFinished: quizFinished,
  }
);

export default connect(propMap, Component);
