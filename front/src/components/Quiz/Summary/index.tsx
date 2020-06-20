import { JSX } from "@/utils/relax";

export const QuizSummary = ({
  quiz: { title, description },
  score,
  questions,
  questionsOrder,
  userAnswers,
  correctAnswers,
  saveScoreNoStats,
  saveScoreWithStats,
  exit,
}: {
  quiz: { title: string; description: string };
  score: number;
  questions: { [id: string]: { [question: string]: string } };
  questionsOrder: Array<string>;
  userAnswers: { [id: string]: string };
  correctAnswers: { [id: string]: boolean };
  saveScoreNoStats(): void;
  saveScoreWithStats(): void;
  exit(): void;
}) => (
  <div className="quiz-question">
    <div className="quiz-question-header">
      <h3>
        <span className="text-secondary">Quiz: </span>
        {title}
      </h3>
      <div>
        <button className="btn btn-light" onmousedown={exit}>
          ✖️
        </button>
      </div>
    </div>
    <h5>
      <span className="text-secondary">{description}</span>
    </h5>
    <hr />
    <h4>Twój wynik: {score / 1000} sek.</h4>
    <br />
    {questionsOrder.map((id, idx) => (
      <div>
        <h5>
          Pytanie {idx + 1}:&nbsp;
          <span className={`badge badge-${correctAnswers[id] ? "success" : "danger"}`}>
            Odpowiedź{" "}
            {correctAnswers[id] ? "poprawna" : `błędna; kara ${questions[id].penalty} sek.`}
          </span>
        </h5>
        <div>{questions[id].question}</div>
        <div className="text-secondary">
          Twoja odpowiedź: <b>{userAnswers[id]}</b>
        </div>
        <div className="text-secondary">
          Odpowiedź poprawna: <b>{questions[id].answer}</b>
        </div>
        <br />
      </div>
    ))}
    <hr />
    <div className="quiz-summary-btn-container">
      <button className="btn btn-success" onmousedown={saveScoreNoStats}>
        Zapisz wynik bez statystyk
      </button>
      <button className="btn btn-success" onmousedown={saveScoreWithStats}>
        Zapisz wynik ze statystykami
      </button>
    </div>
  </div>
);

export default { QuizSummary };
