import { QuizPicker as Component } from "@/components/Quiz/Picker";
import { chooseQuiz, loadQuizList } from "@/actions/quiz";
import { connect } from "@/connector";

const propMap = ({ quiz: { quizOverviews, quizzesStartedLoading } }, dispatch) => ({
  quizzesStartedLoading,
  loadQuizzes: () => dispatch(loadQuizList(dispatch)),
  choices: quizOverviews.map(({ title, description, id }) => ({
    title,
    description,
    choose: () => dispatch(chooseQuiz(id)),
  })),
});

export default connect(propMap, Component);
