import { getQuizList, getQuizDetails } from "@/api";
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
  answers: { questionId: number; answer: string }[]
) => {
  const questionsMap = {};
  for (const question of quiz.questions) {
    questionsMap[question.id] = question;
  }
  return {
    type: FILL_QUIZ_DETAILS,
    quiz: {
      ...quiz,
      questions: questionsMap,
      questionsOrder: quiz.questions.map(({ id }) => id),
    },
    answers,
  };
};

export const LOAD_QUIZ_DETAILS = "LOAD_QUIZ_DETAILS";
export const loadQuizDetails = (dispatch: Function, id: number) => ({
  type: LOAD_QUIZ_DETAILS,
  fun: async () => {
    dispatch(pushLoading());
    const { error, quiz, answers } = await getQuizDetails(id);
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
      dispatch(fillQuizDetails(quiz, answers));
    }
  },
});

export const CHOOSE_QUIZ = "CHOOSE_QUIZ";
export const chooseQuiz = (id: string | null) => ({ type: CHOOSE_QUIZ, id });

export const START_QUIZ = "START_QUIZ";
export const startQuiz = (id: string | null) => ({ type: START_QUIZ, id });

export const FINISH_QUIZ = "FINISH_QUIZ";
export const finishQuiz = () => ({ type: FINISH_QUIZ });

export const EXIT_QUIZ = "EXIT_QUIZ";
export const exitQuiz = () => ({ type: EXIT_QUIZ });

export const CHOOSE_QUESTION_QUIZ = "CHOOSE_QUESTION_QUIZ";
export const chooseQuestionQuiz = (id: string) => ({ type: CHOOSE_QUESTION_QUIZ, id });

export const INPUT_ANSWER_QUIZ = "INPUT_ANSWER_QUIZ";
export const inputAnswerQuiz = (answer: string) => ({ type: INPUT_ANSWER_QUIZ, answer });

export const SAVE_SCORE_NO_STATS_QUIZ = "SAVE_SCORE_NO_STATS_QUIZ";
export const saveScoreNoStatsQuiz = () => ({ type: SAVE_SCORE_NO_STATS_QUIZ });

export const SAVE_SCORE_WITH_STATS_QUIZ = "SAVE_SCORE_WITH_STATS_QUIZ";
export const saveScoreWithStatsQuiz = () => ({ type: SAVE_SCORE_WITH_STATS_QUIZ });
