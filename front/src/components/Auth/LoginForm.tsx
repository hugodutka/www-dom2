import { JSX, Component } from "@/utils/relax";

const usernameInputId = "username-input";
const passwordInputId = "password-input";

export const LoginForm: Component = ({
  login,
}: {
  login(username: string, password: string): void;
}) => (
  <div>
    <h3>Zaloguj się 🔑</h3>
    <form
      onsubmit={(e) => {
        e.preventDefault();
        const usernameInput: any = document.getElementById(usernameInputId);
        const passwordInput: any = document.getElementById(passwordInputId);
        login(usernameInput.value, passwordInput.value);
      }}
    >
      <br></br>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Nazwa użytkownika"
          id={usernameInputId}
        ></input>
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Hasło"
          id={passwordInputId}
        ></input>
      </div>
      <br></br>
      <button type="submit" className="btn btn-primary login-form-btn">
        Zaloguj się
      </button>
    </form>
  </div>
);
