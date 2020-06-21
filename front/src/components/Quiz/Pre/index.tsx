import { JSX, Component } from "@/utils/relax";
import QuizSummary from "@/containers/Quiz/Summary";
import QuizQuestion from "@/containers/Quiz/Question";
import { LoadingScreen } from "@/components/LoadingScreen";

export const QuizPre: Component = ({
  quizStartedLoading,
  quizStarted,
  quizFinished,
  quizSolved,
  loadQuizDetails,
  quizAnswersSent,
  sendAnswers,
}: {
  quizStartedLoading: boolean;
  quizStarted: boolean;
  quizFinished: boolean;
  quizAnswersSent: boolean;
  quizSolved: boolean;
  loadQuizDetails(): void;
  sendAnswers(): void;
}) => {
  if (!quizStartedLoading) loadQuizDetails();
  if (quizFinished && !quizAnswersSent) sendAnswers();
  return quizStarted ? quizSolved ? <QuizSummary /> : <QuizQuestion /> : <LoadingScreen />;
};
