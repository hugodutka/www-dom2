import { Action, State } from '@/utils/relax'
import { CHOOSE_QUIZ, START_QUIZ, FINISH_QUIZ, EXIT_QUIZ, CHOOSE_QUESTION_QUIZ,
  SAVE_SCORE_NO_STATS_QUIZ, SAVE_SCORE_WITH_STATS_QUIZ } from '@/actions/quiz'
import quizzes from '@/content/quizzes'

const initialState = {
  quizzes: quizzes
    .map((quiz) => ({
      ...quiz,
      questions: quiz.questions.reduce(
        (acc, question) => {
          acc[question.id] = question;
          return acc;
        }, {}
      ),
      questionsOrder: quiz.questions.map(({id}) => id)
    }))
    .reduce((acc, quiz) => { acc[quiz.id] = quiz; return acc }, {}),
  chosenQuiz: null,
  quizStarted: false,
  quizFinished: false,
  quizStartedAt: null,
  quizFinishedAt: null,
  userAnswers: null,
  questionTimes: null,
  chosenQuestion: null,
  lastQuestionSwitch: null,
  score: null,
  correctAnswers: null,
}

export const quiz = (state: State = initialState, action: Action = {}): State => {
  switch (action.type) {
    case CHOOSE_QUIZ: {
      return {
        ...state,
        chosenQuiz: action.id,
      };
    } case START_QUIZ: {
      const now = Date.now();
      const quiz = state.quizzes[state.chosenQuiz];
      const userAnswers = {};
      const questionTimes = {};
      for (const id of Object.keys(quiz.questions)) {
        userAnswers[id] = null;
        questionTimes[id] = 0;
      }
      return {
        ...state,
        quizStarted: true,
        quizStartedAt: now,
        chosenQuestion: quiz.questionsOrder[0],
        lastQuestionSwitch: now,
        userAnswers: userAnswers,
        questionTimes: questionTimes,
      };
    } case CHOOSE_QUESTION_QUIZ: {
      const now = Date.now();
      const questionTimes = {...state.questionTimes};
      questionTimes[state.chosenQuestion] += now - state.lastQuestionSwitch;
      return {
        ...state,
        chosenQuestion: action.id,
        lastQuestionSwitch: now,
        questionTimes,
      };
    } case FINISH_QUIZ: {
      const now = Date.now();
      const quiz = state.quizzes[state.chosenQuiz];
      const questionTimes = {...state.questionTimes};
      const correctAnswers = {};
      questionTimes[state.chosenQuestion] += now - state.lastQuestionSwitch;
      var score = 0;
      for (const id of Object.keys(quiz.questions)) {
        score += questionTimes[id];
        const correct = state.userAnswers[id] === quiz.questions[id].answer;
        score += correct ? 0 : quiz.questions[id].penalty;
        correctAnswers[id] = correct;
      }
      return {
        ...state,
        quizFinished: true,
        quizFinishedAt: now,
        questionTimes,
        correctAnswers,
        score,
      };
    } case EXIT_QUIZ: {
      return {
        ...state,
        quizStarted: false,
        quizFinished: false,
        quizStartedAt: null,
        quizFinishedAt: null,
        userAnswers: null,
        questionTimes: null,
        chosenQuestion: null,
        lastQuestionSwitch: null,
      };
    } default:
      return state;
  }
};

export default { quiz };
