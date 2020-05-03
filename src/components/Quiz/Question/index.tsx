import { JSX } from '@/utils/jsx'
import { Timer } from '@/components/Timer'

export const QuizQuestion = ({
  quiz: { title, description }, question, penalty, questionNumber, numberOfQuestions, userAnswer,
  startTime, typeAnswer, next, previous
}: {
  quiz: { title: string, description: string}, question: string, penalty: number,
  questionNumber: number, numberOfQuestions: number, userAnswer: string | null, startTime: number,
  typeAnswer(e: Event): void, next(): void, previous(): void
}) => (
  <div className="quiz-question">
    <div className="quiz-question-header">
      <h3><span className="text-secondary">Quiz: </span>{title}</h3>
      <div>
        <button className="btn btn-light" onmousedown={next}>✖️</button>
      </div>
    </div>
    <h5><span className="text-secondary">{description}</span></h5>
    <hr/>
    <h4>Pytanie {questionNumber} / {numberOfQuestions}</h4>
    <p>{question}</p>
    <div class="input-group flex-nowrap">
      <input
        type="text"
        className="form-control"
        placeholder="Odpowiedź (tylko liczba całkowita)"
        aria-label="Odpowiedź"
        aria-describedby="addon-wrapping"
        value={userAnswer}
        oninput={typeAnswer}
      />
    </div>
    <br/>
    <div className="text-secondary">Kara za złą odpowiedź: <b>{penalty} sek.</b></div>
    <br/>
    <div className="quiz-question-btn-container">
      <button className="btn btn-primary" onmousedown={previous}>Poprzednie pytanie</button>
      <span className="badge badge-light">Czas: <Timer start={startTime}/></span>
      <button className="btn btn-primary" onmousedown={next}>Następne pytanie</button>
    </div>
  </div>
);

export default { QuizQuestion }
