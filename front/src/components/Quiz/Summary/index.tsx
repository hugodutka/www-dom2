import { JSX, Component } from "@/utils/relax";

export const QuizSummary: Component = ({
  quiz: { title, description },
  score,
  questions,
  questionsOrder,
  userAnswers,
  answerStats,
  topScores,
  exit,
}: {
  quiz: { title: string; description: string };
  score: number;
  questions: { [id: number]: { [question: string]: string } };
  questionsOrder: Array<number>;
  userAnswers: { [id: number]: { answer: string; time: number; correct: boolean } };
  answerStats: { [questionId: number]: { avgCorrectTimeInMs: number } };
  topScores: { username: string; score: number }[];
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
    <h4>Twój wynik: {score} sek.</h4>
    <br />
    {questionsOrder.map((id, idx) => (
      <div>
        <h5>
          Pytanie {idx + 1}:&nbsp;
          <span className={`badge badge-${userAnswers[id].correct ? "success" : "danger"}`}>
            Odpowiedź{" "}
            {userAnswers[id].correct ? "poprawna" : `błędna; kara ${questions[id].penalty} sek.`}
          </span>
        </h5>
        <div>{questions[id].question}</div>
        <div className="text-secondary">
          Twoja odpowiedź: <b>{userAnswers[id].answer}</b>
        </div>
        <div className="text-secondary">
          Odpowiedź poprawna: <b>{questions[id].answer}</b>
        </div>
        <div className="text-secondary">
          Czas: <b>{(userAnswers[id].time / 1000).toFixed(2)} sek.</b>
        </div>
        <div className="text-secondary">
          Średni czas globalnie:&nbsp;
          <b>{(((answerStats[id] || {}).avgCorrectTimeInMs || 0) / 1000).toFixed(2)} sek.</b>
        </div>
        <br />
      </div>
    ))}
    <h4>Najwyższe wyniki</h4>
    {topScores.map(({ username, score }, idx) => (
      <div>
        {idx + 1}. <b>{username}</b>: {score.toFixed(2)} sek.
        <br />
      </div>
    ))}
  </div>
);
