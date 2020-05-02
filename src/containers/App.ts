import { App as Component } from "@/components/App"
import { connect } from "@/renderer"

const propMap = ({ quiz: { chosenQuiz } }, dispatch) => (
  {
    isQuizChosen: chosenQuiz !== null,
  }
);

export default connect(propMap, Component);
