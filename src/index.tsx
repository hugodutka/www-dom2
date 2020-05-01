import { JSX } from '@/utils/jsx'
import { createStore } from '@/utils/relax'
import { rootReducer } from '@/reducers'
import { Yo } from '@/components/Yo'

const root: HTMLElement = document.getElementById("root");
root.appendChild(
  <div className="well-hello">
    <b>cześć!</b>
    <Yo someText="Hugo" html={{className: "yo"}}>
      <div>what the heck!</div>
    </Yo>
  </div>
);

const store = createStore(rootReducer);

// @ts-ignore
window.store = store;
