import { JSX, Component } from "@/utils/relax";

export const QuizPreview: Component = ({
  quiz: { title = "", description = "" },
  pastScores = [],
  start = () => {},
  cancel = () => {},
}: {
  quiz: { title: string; description: string };
  start(): void;
  cancel(): void;
  pastScores: Array<{ score: number; finishedAt: number }>;
}) => (
  <div className="quiz-preview">
    <h3>
      <span className="text-secondary">Quiz: </span>
      {title}
    </h3>
    <h5>
      <span className="text-secondary">{description}</span>
    </h5>
    <br />
    <div className="quiz-preview-btn-container">
      <button className="btn btn-secondary" onmousedown={cancel}>
        Powrót
      </button>
      <button className="btn btn-success" onmousedown={start}>
        Zacznij
      </button>
    </div>
    <hr />
    <h4>Poprzednie podejścia</h4>
    {pastScores.length > 0 ? (
      <div className="quiz-preview-scores">
        <table className="table table-borderless">
          <thead>
            <tr>
              <th scope="col">Data</th>
              <th scope="col">Wynik</th>
            </tr>
          </thead>
          <tbody>
            {pastScores.map(({ finishedAt, score }) => (
              <tr>
                <td>{new Date(finishedAt).toLocaleString("pl")}</td>
                <td>{score / 1000} sek.</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p className="text-secondary">Nie masz jeszcze żadnych podejść.</p>
    )}
  </div>
);
