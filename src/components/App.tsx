import { JSX } from '@/utils/jsx'
import QuizPreview from '@/containers/Quiz/Preview'
import QuizPicker from '@/containers/Quiz/Picker'
import QuizQuestion from '@/containers/Quiz/Question'
import QuizSummary from '@/containers/Quiz/Summary'

export const App = (
  { isQuizChosen, isQuizStarted, isQuizFinished }:
  { isQuizChosen: boolean, isQuizStarted: boolean, isQuizFinished: boolean }
) => (
  <div className="app">{
    isQuizChosen ? (
      isQuizStarted ? (
        isQuizFinished ? (
          <QuizSummary/>
        ) :
          <QuizQuestion/>
      ) :
        <QuizPreview/>
    ) :
      <QuizPicker/>
  }</div>
)

export default { App }
