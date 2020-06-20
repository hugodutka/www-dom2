import { JSX, Component } from "@/utils/relax";

const passwordInputId = "new-password-input";

export const ChangePasswordForm: Component = ({
  changePassword,
  cancel,
}: {
  changePassword(newPassword: string): void;
  cancel(): void;
}) => (
  <div>
    <div className="change-password-form-header">
      <h3>Zmień hasło</h3>
      <div>
        <button className="btn btn-light" onmousedown={cancel}>
          ✖️
        </button>
      </div>
    </div>
    <form
      onsubmit={(e) => {
        e.preventDefault();
        const input: any = document.getElementById(passwordInputId);
        changePassword(input.value);
      }}
    >
      <br></br>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Nowe hasło..."
          id={passwordInputId}
        ></input>
        <small id="password-help" className="form-text text-muted">
          Pamiętaj, że musi być turbo bezpieczne. 🔒
        </small>
      </div>
      <button type="submit" className="btn btn-danger password-change-form-btn">
        Zmień hasło
      </button>
    </form>
  </div>
);
