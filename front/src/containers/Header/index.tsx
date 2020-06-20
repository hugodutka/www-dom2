import { Header as Component } from "@/components/Header";
import { connect } from "@/connector";

const propMap = ({ auth: { username } }, _dispatch) => ({
  isLoggedIn: username !== null,
  username,
});

export default connect(propMap, Component);
