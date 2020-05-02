import { Action, State } from '@/utils/relax'
import { CHOOSE_QUIZ } from '@/actions/quiz'
import quizzes from '@/content/quizzes'

const initialState = {
  quizzes: quizzes
    .reduce((acc, quiz) => { acc[quiz.id] = quiz; return acc }, {}),
  chosenQuiz: null,
}

export const quiz = (state: State = initialState, action: Action = {}) => {
  switch (action.type) {
    case CHOOSE_QUIZ:
      return {
        ...state,
        chosenQuiz: action.id,
      };
    default:
      return state;
  }
};

export default { quiz };
