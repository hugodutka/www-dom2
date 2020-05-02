import { JSX } from '@/utils/jsx'

export const Timer = ({start}: {start: number}) => {
  const id = Math.floor(Math.random() * 10 ** 9);
  const fullId = `timer-${id}`;
  const setTime = () => {
    const timer = document.getElementById(fullId);
    if (!timer) return;
    timer.innerHTML = (Math.floor((Date.now() - start) / 1000)).toString();
    window.requestAnimationFrame(setTime);
  };
  return (
    <span className="timer" id={fullId} refresh={setTime}>
      <script>
        document.getElementById("{fullId}").refresh();
      </script>
    </span>
  );
};

export default { Timer }
