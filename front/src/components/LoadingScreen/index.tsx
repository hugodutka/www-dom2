import { JSX, Component } from "@/utils/relax";

export const LoadingScreen: Component = () => (
  <div className="loading-screen">
    <div className="spinner-border text-secondary" role="status">
      <span className="sr-only">Ładowanie...</span>
    </div>
  </div>
);
