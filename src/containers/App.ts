import { App as Component } from "@/components/App"
import { connect } from "@/renderer"

const propMap = ({ quiz: { chosenQuiz, quizStarted } }, dispatch) => (
  {
    isQuizChosen: chosenQuiz !== null,
    isQuizStarted: quizStarted,
  }
);

export default connect(propMap, Component);
