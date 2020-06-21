import { ChangePasswordForm as Component } from "@/components/Auth/ChangePasswordForm";
import { hidePasswordChange, changePassword } from "@/actions/auth";
import { connect } from "@/connector";

const propMap = (_state, dispatch) => ({
  cancel: () => dispatch(hidePasswordChange()),
  changePassword: (password) => dispatch(changePassword(dispatch, password)),
});

export default connect(propMap, Component);
