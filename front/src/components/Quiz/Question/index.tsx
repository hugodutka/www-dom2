import { JSX } from "@/utils/relax";
import { Timer } from "@/components/Timer";
import { isPositiveInteger } from "@/utils/text";

export const QuizQuestion = ({
  quiz: { title, description },
  question,
  penalty,
  questionNumber,
  numberOfQuestions,
  userAnswer,
  startTime,
  allQuestionsAnswered,
  typeAnswer,
  next,
  previous,
  finish,
  exit,
}: {
  quiz: { title: string; description: string };
  question: string;
  penalty: number;
  questionNumber: number;
  numberOfQuestions: number;
  userAnswer: string | null;
  startTime: number;
  allQuestionsAnswered: boolean;
  typeAnswer(e: Event): void;
  next(): void;
  previous(): void;
  finish(): void;
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
    <h4>
      Pytanie {questionNumber} / {numberOfQuestions}
    </h4>
    <p>{question}</p>
    <div class="input-group flex-nowrap">
      <input
        id="question-answer"
        type="text"
        className="form-control"
        placeholder="Odpowiedź"
        aria-label="Odpowiedź"
        aria-describedby="addon-wrapping"
        value={userAnswer}
        oninput={typeAnswer}
        autofocus
      />
      <script>document.getElementById("question-answer").focus();</script>
    </div>
    <br />
    {isPositiveInteger(userAnswer) || userAnswer === "" || userAnswer === null ? (
      ""
    ) : (
      <div className="alert alert-warning" role="alert">
        Poprawna odpowiedź może być tylko liczbą całkowitą.
      </div>
    )}
    <div className="text-secondary">
      Kara za złą odpowiedź: <b>{penalty} sek.</b>
    </div>
    <br />
    <div className="quiz-question-btn-container">
      <button
        className={`btn btn-primary ${questionNumber <= 1 && "disabled"}`}
        onmousedown={questionNumber > 1 && previous}
      >
        Poprzednie pytanie
      </button>
      <span className="badge badge-light">
        Czas: <Timer start={startTime} /> sek.
      </span>
      <button
        className={`btn btn-primary ${questionNumber >= numberOfQuestions && "disabled"}`}
        onmousedown={questionNumber < numberOfQuestions && next}
      >
        Następne pytanie
      </button>
    </div>
    {!allQuestionsAnswered ? (
      ""
    ) : (
      <div>
        <hr />
        <button id="finish-quiz-btn" className="btn btn-success" onmousedown={finish}>
          Zakończ quiz
        </button>
      </div>
    )}
  </div>
);

export default { QuizQuestion };
