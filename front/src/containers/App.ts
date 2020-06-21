import { App as Component } from "@/components/App";
import { connect } from "@/connector";

const propMap = (
  { auth: { username, showPasswordChange }, loading: { loadingCounter } },
  _dispatch
) => ({
  isLoggedIn: username !== null,
  isLoading: loadingCounter > 0,
  showPasswordChange,
});

export default connect(propMap, Component);
