import { Quiz as Component } from "@/components/Quiz";
import { connect } from "@/connector";

const propMap = ({ quiz: { chosenQuiz } }, _dispatch) => ({
  isQuizChosen: chosenQuiz !== null,
});

export default connect(propMap, Component);
