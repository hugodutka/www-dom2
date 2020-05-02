import { QuizPicker as Component } from "@/components/Quiz/Picker"
import { chooseQuiz } from '@/actions/quiz'
import { connect } from "@/renderer"

const propMap = ({ quiz: { quizzes } }, dispatch) => (
  {
    choices: Object.values(quizzes).map(({title, description, id}) => ({
      title,
      description,
      choose: () => dispatch(chooseQuiz(id))
    })).sort((a, b) => a.title.localeCompare(b.title)),
  }
);

export default connect(propMap, Component);
