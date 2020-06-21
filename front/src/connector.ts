import { connect as relaxConnect, PropMap, Component } from "@/utils/relax";

export const connect = (propMap: PropMap, component: Component): Component =>
  // @ts-ignore
  relaxConnect(() => window.renderer, propMap, component);
