import { getQuizList, getQuizDetails, solveQuiz as fetchSolveQuiz } from "@/api";
import { putFlash, FlashVariant } from "@/actions/flash";
import { pushLoading, popLoading } from "@/actions/loading";
import { resetState } from "@/actions";

export const FILL_QUIZ_LIST = "FILL_QUIZ_LIST";
export const fillQuizList = (quizzes: { id: number; title: string; description: string }[]) => ({
  type: FILL_QUIZ_LIST,
  quizzes: [...quizzes].sort((a, b) => a.title.localeCompare(b.title)),
});

export const LOAD_QUIZ_LIST = "LOAD_QUIZ_LIST";
export const loadQuizList = (dispatch: Function) => ({
  type: LOAD_QUIZ_LIST,
  fun: async () => {
    dispatch(pushLoading());
    const { error, quizzes } = await getQuizList();
    dispatch(popLoading(), false);
    if (error) {
      console.log("get quiz list error", error);
      dispatch(resetState(), false);
      dispatch(
        putFlash(
          FlashVariant.Danger,
          "Nie udało się pobrać quizów. Logowanie powiodło się, ale spróbuj jeszcze raz."
        )
      );
    } else {
      dispatch(fillQuizList(quizzes));
    }
  },
});

export const FILL_QUIZ_DETAILS = "FILL_QUIZ_DETAILS";
export const fillQuizDetails = (
  quiz: {
    id: number;
    title: string;
    description: string;
    questions: { id: number; question: string; penalty: number }[];
  },
  answers: { questionId: number; answer: string; time: number }[],
  topScores: { username: string; score: number }[],
  answerStats: { questionId: number; avgCorrectTimeInMs: number }[],
  score: number
) => {
  const questionsMap = {};
  for (const question of quiz.questions) {
    questionsMap[question.id] = question;
  }
  const answersMap = {};
  for (const answer of answers) {
    answersMap[answer.questionId] = answer;
  }
  const answerStatsMap = {};
  for (const stats of answerStats) {
    answerStatsMap[stats.questionId] = stats;
  }
  return {
    type: FILL_QUIZ_DETAILS,
    quiz: {
      ...quiz,
      questions: questionsMap,
      questionsOrder: quiz.questions.map(({ id }) => id),
      userAnswers: answersMap,
    },
    topScores,
    score,
    answerStats: answerStatsMap,
  };
};

export const LOAD_QUIZ_DETAILS = "LOAD_QUIZ_DETAILS";
export const loadQuizDetails = (dispatch: Function, id: number) => ({
  type: LOAD_QUIZ_DETAILS,
  fun: async () => {
    dispatch(pushLoading());
    const { error, quiz, answers, topScores, answerStats, score } = await getQuizDetails(id);
    dispatch(popLoading(), false);
    if (error) {
      console.log("get quiz details error", error);
      dispatch(resetState(), false);
      dispatch(
        putFlash(
          FlashVariant.Danger,
          "Nie udało się pobrać quizów. Logowanie powiodło się, ale spróbuj jeszcze raz."
        )
      );
    } else {
      dispatch(fillQuizDetails(quiz, answers, topScores, answerStats, score), false);
      dispatch(startQuiz());
    }
  },
});

export const SOLVE_QUIZ = "SOLVE_QUIZ";
export const solveQuiz = (
  dispatch: Function,
  id: number,
  answers: { questionId: number; answer: string }[]
) => ({
  type: SOLVE_QUIZ,
  fun: async () => {
    dispatch(pushLoading());
    const { error } = await fetchSolveQuiz(id, answers);
    if (error) {
      console.log("get quiz details error", error);
      dispatch(putFlash(FlashVariant.Danger, "Nie udało się ocenić quizu."));
    } else {
      dispatch(loadQuizDetails(dispatch, id), false);
    }
    dispatch(popLoading());
  },
});

export const CHOOSE_QUIZ = "CHOOSE_QUIZ";
export const chooseQuiz = (id: string | null) => ({ type: CHOOSE_QUIZ, id });

export const START_QUIZ = "START_QUIZ";
export const startQuiz = () => ({ type: START_QUIZ });

export const FINISH_QUIZ = "FINISH_QUIZ";
export const finishQuiz = () => ({ type: FINISH_QUIZ });

export const EXIT_QUIZ = "EXIT_QUIZ";
export const exitQuiz = () => ({ type: EXIT_QUIZ });

export const CHOOSE_QUESTION_QUIZ = "CHOOSE_QUESTION_QUIZ";
export const chooseQuestionQuiz = (id: string) => ({ type: CHOOSE_QUESTION_QUIZ, id });

export const INPUT_ANSWER_QUIZ = "INPUT_ANSWER_QUIZ";
export const inputAnswerQuiz = (answer: string) => ({ type: INPUT_ANSWER_QUIZ, answer });
