import { JSX, Component } from "@/utils/relax";
import QuizPreview from "@/containers/Quiz/Preview";
import QuizPicker from "@/containers/Quiz/Picker";
import QuizQuestion from "@/containers/Quiz/Question";
import QuizSummary from "@/containers/Quiz/Summary";

export const Quiz = ({
  isQuizChosen,
  isQuizStarted,
  isQuizFinished,
}: {
  isQuizChosen: boolean;
  isQuizStarted: boolean;
  isQuizFinished: boolean;
}): Component =>
  isQuizChosen ? (
    isQuizStarted ? (
      isQuizFinished ? (
        <QuizSummary />
      ) : (
        <QuizQuestion />
      )
    ) : (
      <QuizPreview />
    )
  ) : (
    <QuizPicker />
  );
