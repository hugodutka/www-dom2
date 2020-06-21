import { Action, State } from "@/utils/relax";
import {
  LOAD_QUIZ_LIST,
  FILL_QUIZ_LIST,
  LOAD_QUIZ_DETAILS,
  FILL_QUIZ_DETAILS,
  CHOOSE_QUIZ,
  START_QUIZ,
  FINISH_QUIZ,
  SOLVE_QUIZ,
  EXIT_QUIZ,
  CHOOSE_QUESTION_QUIZ,
  INPUT_ANSWER_QUIZ,
} from "@/actions/quiz";
import { deepCopyString } from "@/utils/text";

const initialState = {
  quizzesStartedLoading: false,
  quizOverviews: [],
  quizStartedLoading: false,
  chosenQuiz: null,
  quiz: {},
  quizStarted: false,
  quizFinished: false,
  quizStartedAt: null,
  quizFinishedAt: null,
  userAnswers: null,
  questionTimes: null,
  chosenQuestion: null,
  lastQuestionSwitch: null,
  quizAnswersSent: false,
};

export const quiz = (state: State = initialState, action: Action = {}): State => {
  switch (action.type) {
    case LOAD_QUIZ_LIST: {
      return {
        ...state,
        quizzesStartedLoading: true,
      };
    }
    case FILL_QUIZ_LIST: {
      return {
        ...state,
        quizOverviews: action.quizzes,
      };
    }
    case LOAD_QUIZ_DETAILS: {
      return {
        ...state,
        quizStartedLoading: true,
      };
    }
    case FILL_QUIZ_DETAILS: {
      return {
        ...state,
        quiz: action.quiz,
      };
    }
    case CHOOSE_QUIZ: {
      return {
        ...state,
        chosenQuiz: action.id,
        quizStartedLoading: false,
        quiz: {},
      };
    }
    case START_QUIZ: {
      const now = Date.now();
      const { quiz } = state;
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
        userAnswers,
        questionTimes,
      };
    }
    case CHOOSE_QUESTION_QUIZ: {
      const now = Date.now();
      const questionTimes = { ...state.questionTimes };
      questionTimes[state.chosenQuestion] += now - state.lastQuestionSwitch;
      return {
        ...state,
        chosenQuestion: action.id,
        lastQuestionSwitch: now,
        questionTimes,
      };
    }
    case INPUT_ANSWER_QUIZ: {
      const answers = { ...state.userAnswers };
      answers[state.chosenQuestion] = deepCopyString(action.answer);
      return {
        ...state,
        userAnswers: answers,
      };
    }
    case FINISH_QUIZ: {
      const now = Date.now();
      const questionTimes = { ...state.questionTimes };
      questionTimes[state.chosenQuestion] += now - state.lastQuestionSwitch;
      return {
        ...state,
        quizFinished: true,
        quizFinishedAt: now,
        quizAnswersSent: false,
        questionTimes,
      };
    }
    case SOLVE_QUIZ: {
      return {
        ...state,
        quizAnswersSent: true,
      };
    }
    case EXIT_QUIZ: {
      return {
        ...state,
        chosenQuiz: null,
        quizStarted: false,
        quizFinished: false,
        quizStartedAt: null,
        quizFinishedAt: null,
        userAnswers: null,
        questionTimes: null,
        chosenQuestion: null,
        lastQuestionSwitch: null,
        quizStartedLoading: false,
        quizzesStartedLoading: false,
        quizAnswersSent: false,
      };
    }
    default:
      return state;
  }
};
