// The functionality of this module mirrors Redux; https://redux.js.org/.

export interface State {
  [x: string]: any
}

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

export const combineReducers = (...reducers: Array<[string, Reducer]>): Reducer => (
  (state: State, action: Action): State => {
    var result = {};
    for (const [name, r] of reducers) {
      result[name] = r(state && state[name], action);
    }
    return result;
  }
)
