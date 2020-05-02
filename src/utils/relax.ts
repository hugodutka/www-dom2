// This module provides state management and rendering utilities. Its name is a pun on React and
// Redux.

export interface State {}

export interface Action {
  type?: string,
  [x: string]: any
}

export interface Reducer {
  (state: State, action: Action): State
}

export interface Store {
  state: State,
  reducer: Reducer,
  dispatch(action: Action): void,
  getState(): State,
}

export interface PropMap {
  (state: State, dispatch: Store["dispatch"]): Object
}

export interface Component {
  (args?: Object): HTMLElement
}

export interface Renderer {
  root: HTMLElement,
  store: Store,
  component: Component,
  dispatch(action: Action): void
}

export interface RendererGetter {
  (): Renderer
}

export class Store implements Store {
  constructor(reducer: Reducer) {
    this.state = reducer(undefined, undefined);
    this.reducer = reducer;
  }

  dispatch = (action: Action) => {
    this.state = this.reducer(this.state, action);
  }

  getState = (): State => (
    this.state
  )
}

export const combineReducers = (...reducers: Array<[string, Reducer]>): Reducer => (
  (state: State, action: Action): State => {
    var result = {};
    for (const [name, r] of reducers) {
      result[name] = r(state && state[name], action);
    }
    return result;
  }
)

export const render = (app: Component, root: HTMLElement) => {
  const newChild = app();
  while (root.hasChildNodes()) {
    root.removeChild(root.firstChild);
  }
  root.appendChild(newChild);
}

export class Renderer implements Renderer {
  constructor(root: HTMLElement, store: Store, component: Component) {
    this.root = root;
    this.store = store;
    this.component = component;
  }

  dispatch = (action: Action): void => {
    console.log(action);
    this.store.dispatch(action);
    render(this.component, this.root);
  }
}

export const connect = (
  renderer: RendererGetter, propMap: PropMap, component: Component
): Component => (
  () => component(propMap(renderer().store.getState(), renderer().dispatch))
) 

export default { Store, Renderer };
