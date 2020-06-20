import { JSX } from "@/utils/relax";
import { ChangePasswordForm } from "@/components/Auth/ChangePasswordForm";
import LoginForm from "@/containers/Auth/LoginForm";
import Quiz from "@/containers/Quiz";
import Header from "@/containers/Header";

export const App = ({
  isLoading,
  isLoggedIn,
  showPasswordChange,
}: {
  isLoading: boolean;
  isLoggedIn: boolean;
  showPasswordChange: boolean;
}) => (
  <div className="app">
    <Header />
    <div className="content">
      {isLoading ? (
        ""
      ) : isLoggedIn ? (
        showPasswordChange ? (
          <ChangePasswordForm />
        ) : (
          <Quiz />
        )
      ) : (
        <LoginForm />
      )}
    </div>
  </div>
);

export default { App };
