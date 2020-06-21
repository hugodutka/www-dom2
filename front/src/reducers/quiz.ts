import { Action, State } from "@/utils/relax";
import {
  LOAD_QUIZ_LIST,
  FILL_QUIZ_LIST,
  LOAD_QUIZ_DETAILS,
  FILL_QUIZ_DETAILS,
  CHOOSE_QUIZ,
  START_QUIZ,
  FINISH_QUIZ,
  EXIT_QUIZ,
  CHOOSE_QUESTION_QUIZ,
  INPUT_ANSWER_QUIZ,
  SAVE_SCORE_NO_STATS_QUIZ,
  SAVE_SCORE_WITH_STATS_QUIZ,
} from "@/actions/quiz";
import { deepCopyString } from "@/utils/text";

const initialState = {
  quizzesStartedLoading: false,
  quizOverviews: [],
  quizStartedLoading: false,
  quizzes: {},
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
  pastScores: JSON.parse(localStorage.getItem("pastScores") || "{}"),
};

const saveScore = (state: State, scores: boolean): State => {
  const newState = { ...state };
  newState.pastScores = { ...state.pastScores };
  if (!newState.pastScores.hasOwnProperty(state.chosenQuiz)) {
    newState.pastScores[state.chosenQuiz] = [];
  }
  newState.pastScores[state.chosenQuiz] = [
    ...newState.pastScores[state.chosenQuiz],
    {
      finishedAt: state.quizFinishedAt,
      score: state.score,
      questionTimes: scores ? { ...state.questionTimes } : null,
    },
  ];
  localStorage.setItem("pastScores", JSON.stringify(newState.pastScores));
  return newState;
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
      const newQuizzes = { ...state.quizzes };
      newQuizzes[action.quiz.id] = action.quiz;
      return {
        ...state,
        quizzes: newQuizzes,
      };
    }
    case CHOOSE_QUIZ: {
      return {
        ...state,
        chosenQuiz: action.id,
        quizStartedLoading: false,
        quizzes: {},
      };
    }
    case START_QUIZ: {
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
      const quiz = state.quizzes[state.chosenQuiz];
      const questionTimes = { ...state.questionTimes };
      const correctAnswers = {};
      questionTimes[state.chosenQuestion] += now - state.lastQuestionSwitch;
      var score = 0;
      for (const id of Object.keys(quiz.questions)) {
        score += questionTimes[id];
        const correct = state.userAnswers[id] === quiz.questions[id].answer;
        const penalty = correct ? 0 : quiz.questions[id].penalty * 1000;
        score += penalty;
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
    }
    case SAVE_SCORE_NO_STATS_QUIZ: {
      return saveScore(state, false);
    }
    case SAVE_SCORE_WITH_STATS_QUIZ: {
      return saveScore(state, true);
    }
    case EXIT_QUIZ: {
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
        score: null,
        correctAnswers: null,
        quizStartedLoading: false,
        quizzes: {},
      };
    }
    default:
      return state;
  }
};
