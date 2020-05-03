export const CHOOSE_QUIZ = "CHOOSE_QUIZ";
export const chooseQuiz = (id: string | null) => (
  {type: CHOOSE_QUIZ, id}
);

export const START_QUIZ = "START_QUIZ";
export const startQuiz = (id: string | null) => (
  {type: START_QUIZ, id}
);

export const FINISH_QUIZ = "FINISH_QUIZ";
export const finishQuiz = () => (
  {type: FINISH_QUIZ}
);

export const EXIT_QUIZ = "EXIT_QUIZ";
export const exitQuiz = () => (
  {type: EXIT_QUIZ}
);

export const CHOOSE_QUESTION_QUIZ = "CHOOSE_QUESTION_QUIZ";
export const chooseQuestionQuiz = (id: string) => (
  {type: CHOOSE_QUESTION_QUIZ, id}
);

export const SAVE_SCORE_NO_STATS_QUIZ = "SAVE_SCORE_NO_STATS_QUIZ";
export const saveScoreNoStatsQuiz = () => (
  {type: SAVE_SCORE_NO_STATS_QUIZ}
);

export const SAVE_SCORE_WITH_STATS_QUIZ = "SAVE_SCORE_WITH_STATS_QUIZ";
export const saveScoreWithStatsQuiz = () => (
  {type: SAVE_SCORE_WITH_STATS_QUIZ}
);
