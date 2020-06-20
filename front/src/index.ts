import { Store, Renderer } from "@/utils/relax";
import { rootReducer } from "@/reducers";
import App from "@/containers/App";

const root = document.getElementById("root");
export const store = new Store(rootReducer);
export const renderer = new Renderer(root, store, App);

// @ts-ignore
window.renderer = renderer;

renderer.dispatch({});
