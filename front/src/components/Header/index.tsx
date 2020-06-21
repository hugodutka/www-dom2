import { JSX } from "@/utils/relax";
import { Component } from "@/utils/relax";

export const Header: Component = ({
  isLoggedIn,
  username,
  logout,
  showPasswordChangeForm,
}: {
  isLoggedIn: boolean;
  username: string;
  logout(): void;
  showPasswordChangeForm(): void;
}) => (
  <header>
    <b className="header-title">Quizy</b>
    {isLoggedIn ? (
      <div className="header-info">
        <div className="username">
          😀&nbsp;<b>{username}</b>
        </div>
        <button className="btn btn-light" onmousedown={showPasswordChangeForm}>
          Zmień hasło
        </button>
        <button className="btn btn-secondary" onmousedown={logout}>
          Wyloguj
        </button>
      </div>
    ) : (
      ""
    )}
  </header>
);

export default { Header };
