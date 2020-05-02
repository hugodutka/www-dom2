import { JSX } from '@/utils/jsx'
import { Renderer } from '@/utils/relax'
import { store } from '@/store'
import App from '@/containers/App'

const root = document.getElementById("root");
const renderer = new Renderer(root, store, () => <App/>);
// @ts-ignore
window.renderer = renderer;
// @ts-ignore
window.store = store;

renderer.dispatch({})
