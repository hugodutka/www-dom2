import { JSX } from "@/utils/relax";
import { Component } from "@/utils/relax";

export const Header: Component = ({
  isLoggedIn,
  username,
  logout,
}: {
  isLoggedIn: boolean;
  username: string;
  logout(): void;
}) => (
  <header>
    <b className="header-title">Quizy</b>
  </header>
);

export default { Header };
