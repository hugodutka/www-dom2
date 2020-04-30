import { JSX } from '@/utils/jsx'
import { Yo } from '@/components/Yo'

const root: HTMLElement = document.getElementById("root");
root.appendChild(
  <div className="well-hello">
    <b>cześć!</b>
    <Yo className="yo-class"/>
  </div>
);
