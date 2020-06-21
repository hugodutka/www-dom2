import { JSX, Component } from "@/utils/relax";
import QuizPreview from "@/containers/Quiz/Preview";
import { LoadingScreen } from "@/components/LoadingScreen";

export const QuizPre: Component = ({
  quizStartedLoading,
  quizLoaded,
  loadQuizDetails,
}: {
  quizStartedLoading: boolean;
  quizLoaded: boolean;
  loadQuizDetails(): void;
}) => {
  if (!quizStartedLoading) loadQuizDetails();
  return quizLoaded ? <QuizPreview /> : <LoadingScreen />;
};
