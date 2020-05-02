export const CHOOSE_QUIZ = "CHOOSE_QUIZ";
export const chooseQuiz = (id: string | null) => (
  {type: CHOOSE_QUIZ, id}
);
