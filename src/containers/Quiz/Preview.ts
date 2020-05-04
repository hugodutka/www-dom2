import { QuizPreview as Component } from "@/components/Quiz/Preview"
import { chooseQuiz, startQuiz } from '@/actions/quiz'
import { connect } from "@/connector"

const propMap = ({ quiz: { quizzes, chosenQuiz, pastScores } }, dispatch) => (
  {
    quiz: quizzes[chosenQuiz],
    start: () => dispatch(startQuiz(chosenQuiz)),
    cancel: () => dispatch(chooseQuiz(null)),
    pastScores: [...(pastScores[chosenQuiz] || [])].reverse(),
  }
);

export default connect(propMap, Component);
