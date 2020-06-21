import { JSX, Component } from "@/utils/relax";
import QuizPicker from "@/containers/Quiz/Picker";
import QuizQuestion from "@/containers/Quiz/Question";
import QuizSummary from "@/containers/Quiz/Summary";
import QuizPre from "@/containers/Quiz/Pre";

export const Quiz: Component = ({
  isQuizChosen,
  isQuizStarted,
  isQuizFinished,
}: {
  isQuizChosen: boolean;
  isQuizStarted: boolean;
  isQuizFinished: boolean;
}) =>
  isQuizChosen ? (
    isQuizStarted ? (
      isQuizFinished ? (
        <QuizSummary />
      ) : (
        <QuizQuestion />
      )
    ) : (
      <QuizPre />
    )
  ) : (
    <QuizPicker />
  );
