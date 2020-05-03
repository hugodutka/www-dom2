import { JSX } from '@/utils/jsx'
import QuizPreview from '@/containers/Quiz/Preview'
import QuizPicker from '@/containers/Quiz/Picker'
import { QuizQuestion } from '@/components/Quiz/Question'

export const App = ({ isQuizChosen }: { isQuizChosen: boolean }) => (
  <div className="app">
    <QuizQuestion
      quiz={{title: "Filmy", description: "Co ty wiesz?"}}
      question="Ile sezonów ma HIMYM?"
      penalty={3}
      questionNumber={1}
      numberOfQuestions={5}
      userAnswer={"hugo"}
      startTime={Date.now()}
      typeAnswer={(e) => { console.log(e) }}
      next={() => console.log("nastepne pytanie")}
      previous={() => console.log("poprzednie pytanie")}
    />
  </div>
)

export default { App }
