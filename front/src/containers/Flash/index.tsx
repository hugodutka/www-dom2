import { Flash as Component } from "@/components/Flash";
import { removeFlash } from "@/actions/flash";
import { connect } from "@/connector";

const propMap = ({ flash: { messages } }, dispatch) => ({
  remove: (id) => dispatch(removeFlash(id)),
  messages: Object.values(messages).sort((a: any, b: any) => a.id - b.id),
});

export default connect(propMap, Component);
