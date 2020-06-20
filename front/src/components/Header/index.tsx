import { JSX } from "@/utils/relax";
import { Component } from "@/utils/relax";

export const Header: Component = ({
  isLoggedIn,
  username,
  logout,
  toggleChangePassword,
}: {
  isLoggedIn: boolean;
  username: string;
  logout(): void;
  toggleChangePassword(): void;
}) => (
  <header>
    <b className="header-title">Quizy</b>
    {isLoggedIn ? (
      <div className="header-info">
        <div className="username">
          😀&nbsp;<b>{username}</b>
        </div>
        <button className="btn btn-light" onmousedown={toggleChangePassword}>
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
