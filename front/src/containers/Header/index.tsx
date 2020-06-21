import { Header as Component } from "@/components/Header";
import { showPasswordChange } from "@/actions/auth";
import { connect } from "@/connector";

const propMap = ({ auth: { username } }, dispatch) => ({
  isLoggedIn: username !== null,
  username,
  showPasswordChangeForm: () => dispatch(showPasswordChange()),
});

export default connect(propMap, Component);
