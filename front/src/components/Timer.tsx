import { JSX, Component } from "@/utils/relax";

var nextId = 0;

export const Timer: Component = ({ start }: { start: number }) => {
  const id = `timer-${nextId++}`;
  const setTime = () => {
    const timer = document.getElementById(id);
    if (!timer) return;
    timer.innerHTML = Math.floor((Date.now() - start) / 1000).toString();
    window.requestAnimationFrame(setTime);
  };
  return (
    <span className="timer" id={id} refresh={setTime}>
      <script>document.getElementById("{id}").refresh();</script>
    </span>
  );
};
