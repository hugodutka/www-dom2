import { JSX } from "@/utils/relax";
import Quiz from "@/containers/Quiz";
import Header from "@/containers/Header";

export const App = ({}) => (
  <div className="app">
    <Header />
    <div className="content">
      <Quiz />
    </div>
  </div>
);

export default { App };
