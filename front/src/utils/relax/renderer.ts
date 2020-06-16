// This module is responsible for making it possible for components to get state directly from
// a relax store.

import { Action, State, Store } from './store'

export interface Component {
  (args?: Object): HTMLElement
}

export interface Renderer {
  root: HTMLElement,
  store: Store,
  component: Component,
  dispatch(action: Action, noRender?: boolean): void
}

export interface PropMap {
  (state: State, dispatch: Renderer["dispatch"]): Object
}

export interface RendererGetter {
  (): Renderer
}

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

  dispatch = (action: Action, noRender: boolean = false): void => {
    console.log(action);
    this.store.dispatch(action);
    if (!noRender) {
      render(this.component, this.root);
    }
  }
}

export const connect = (
  renderer: RendererGetter, propMap: PropMap, component: Component
): Component => (
  () => component(propMap(renderer().store.getState(), renderer().dispatch))
) 
