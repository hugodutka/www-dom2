import { QuizPreview as Component } from "@/components/Quiz/Preview"
import { chooseQuiz, startQuiz } from '@/actions/quiz'
import { connect } from "@/renderer"

const propMap = ({ quiz: { quizzes, chosenQuiz } }, dispatch) => (
  {
    quiz: quizzes[chosenQuiz],
    start: () => dispatch(startQuiz(chosenQuiz)),
    cancel: () => dispatch(chooseQuiz(null)),
    scores: [],
  }
);

export default connect(propMap, Component);
