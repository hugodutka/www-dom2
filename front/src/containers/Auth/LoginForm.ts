import { LoginForm as Component } from "@/components/Auth/LoginForm";
import { login } from "@/actions/auth";
import { connect } from "@/connector";

const propMap = (_state, dispatch) => ({
  login: (username, password) => dispatch(login(dispatch, username, password)),
});

export default connect(propMap, Component);
