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

export const createStore = (reducer: Reducer): Store => (
  new Store(reducer)
)

export const combineReducers = (...reducers: Array<[string, Reducer]>): Reducer => (
  (state: State, action: Action): State => {
    var result = {};
    for (const [name, r] of reducers) {
      result[name] = r(state && state[name], action);
    }
    return result;
  }
)

export const render = (app, root: HTMLElement) => {
  const newChild = app();
  while (root.hasChildNodes()) {
    root.removeChild(root.firstChild);
  }
  root.appendChild(newChild);
}

export default { Store, createStore, render };
