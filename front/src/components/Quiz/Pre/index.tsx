import { JSX, Component } from "@/utils/relax";
import QuizSummary from "@/containers/Quiz/Summary";
import QuizQuestion from "@/containers/Quiz/Question";
import { LoadingScreen } from "@/components/LoadingScreen";

export const QuizPre: Component = ({
  quizStartedLoading,
  quizStarted,
  quizSolved,
  loadQuizDetails,
}: {
  quizStartedLoading: boolean;
  quizStarted: boolean;
  quizSolved: boolean;
  loadQuizDetails(): void;
}) => {
  if (!quizStartedLoading) loadQuizDetails();
  return quizStarted ? quizSolved ? <QuizSummary /> : <QuizQuestion /> : <LoadingScreen />;
};
