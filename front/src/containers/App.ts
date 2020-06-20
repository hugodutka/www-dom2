import { App as Component } from "@/components/App";
import { connect } from "@/connector";

const propMap = ({ auth: { username } }, _dispatch) => ({
  isLoggedIn: username !== null,
});

export default connect(propMap, Component);
