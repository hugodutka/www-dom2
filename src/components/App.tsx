import { JSX } from '@/utils/jsx'
import QuizPreview from '@/containers/Quiz/Preview'
import QuizPicker from '@/containers/Quiz/Picker'

export const App = ({ isQuizChosen }: { isQuizChosen: boolean }) => (
  <div className="app">{
    isQuizChosen ? 
      <QuizPreview/>
    :
      <QuizPicker/>
  }</div>
)

export default { App }
