import { JSX } from '@/utils/jsx'
import QuizPreview from '@/containers/Quiz/Preview'
import QuizPicker from '@/containers/Quiz/Picker'
import QuizQuestion from '@/containers/Quiz/Question'

export const App = (
  { isQuizChosen, isQuizStarted }:
  { isQuizChosen: boolean, isQuizStarted: boolean }
) => (
  <div className="app">{
    isQuizChosen ? (
      isQuizStarted ? (
        <QuizQuestion/>
      ) :
        <QuizPreview/>
    ) :
      <QuizPicker/>
  }</div>
)

export default { App }
