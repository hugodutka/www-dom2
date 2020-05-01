import { Yo as Component } from "@/components/Yo"
import { connect } from "@/renderer"

const propMap = (state, dispatch) => (
  {
    someText: state.yo.name,
  }
);

export const Yo = connect(propMap, Component);

export default { Yo };
