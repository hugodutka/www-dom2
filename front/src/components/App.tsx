import { JSX } from "@/utils/relax";
import { LoadingScreen } from "@/components/LoadingScreen";
import ChangePasswordForm from "@/containers/Auth/ChangePasswordForm";
import LoginForm from "@/containers/Auth/LoginForm";
import Quiz from "@/containers/Quiz";
import Header from "@/containers/Header";
import Flash from "@/containers/Flash";

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
    <Flash />
    <div className="content">
      {isLoading ? (
        <LoadingScreen />
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
