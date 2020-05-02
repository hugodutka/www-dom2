import { JSX } from '@/utils/jsx'
import { Component } from '@/utils/relax'

export const QuizPreview: Component = (
  { quiz: { title = "", description = "" }, scores, start, cancel }
: { quiz: { title: string, description: string }, scores: any, start(): void, cancel(): void}
): HTMLElement => (
  <div className="quiz-preview">
    <h3>
    <span className="text-secondary">Quiz: </span>{title}
    </h3>
    <h6>
      <span className="text-secondary">Opis: </span>{description}
    </h6>
    <br/>
    <div className="quiz-preview-btn-container">
      <button className="btn btn-secondary" onmousedown={cancel}>Powrót</button>
      <button className="btn btn-success" onmousedown={start}>Zacznij</button>
    </div>
    <hr/>
    <h4>Poprzednie podejścia</h4>
    <div className="quiz-preview-scores">{
      scores.length > 0 ?
        scores.map(({ date, score, time = null, penalties = null }) => (
          <div className="alert">
            <span>{date}</span>
            <span>{score}</span>
            {time && <span>{time}</span>}
            {penalties && <span>{penalties}</span>}
          </div>))
      :
        <p className="text-secondary">Nie masz jeszcze żadnych podejść.</p>
    }</div>
  </div>
)

export default { QuizPreview }
