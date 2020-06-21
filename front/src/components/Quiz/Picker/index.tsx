import { JSX, Component } from "@/utils/relax";
import { QuizChoice } from "./types";

export const QuizPicker = ({ choices }: { choices: Array<QuizChoice> }): Component => (
  <div className="quiz-picker">
    <h4>Który quiz chcesz zacząć?</h4>
    <br />
    <div className="quiz-choices">
      {choices.map(({ title, description, choose }) => (
        <div className="card">
          <div className="card-body">
            <h6 className="card-title">{title}</h6>
            <p className="card-text">{description}</p>
          </div>
          <button className="btn btn-primary" onmousedown={choose}>
            Wybierz
          </button>
        </div>
      ))}
    </div>
  </div>
);
