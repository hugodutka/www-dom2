import { JSX, Component } from "@/utils/relax";
import QuizPicker from "@/containers/Quiz/Picker";
import QuizPre from "@/containers/Quiz/Pre";

export const Quiz: Component = ({ isQuizChosen }: { isQuizChosen: boolean }) =>
  isQuizChosen ? <QuizPre /> : <QuizPicker />;
