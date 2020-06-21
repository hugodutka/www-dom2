import { Header as Component } from "@/components/Header";
import { showPasswordChange, logout } from "@/actions/auth";
import { connect } from "@/connector";

const propMap = ({ auth: { username } }, dispatch) => ({
  isLoggedIn: username !== null,
  username,
  showPasswordChangeForm: () => dispatch(showPasswordChange()),
  logout: () => dispatch(logout(dispatch)),
});

export default connect(propMap, Component);
