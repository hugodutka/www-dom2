import { QuizPreview as Component } from "@/components/Quiz/Preview"
import { chooseQuiz } from '@/actions/quiz'
import { connect } from "@/renderer"

const propMap = ({ quiz: { quizzes, chosenQuiz } }, dispatch) => (
  {
    quiz: quizzes[chosenQuiz],
    start: () => console.log(`chcę zacząć quiz ${chosenQuiz}!`),
    cancel: () => dispatch(chooseQuiz(null)),
    scores: [],
  }
);

export default connect(propMap, Component);
