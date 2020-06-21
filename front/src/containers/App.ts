import { App as Component } from "@/components/App";
import { connect } from "@/connector";

const propMap = ({ auth: { username }, loading: { loadingCounter } }, _dispatch) => {
  console.log("app", loadingCounter);
  return {
    isLoggedIn: username !== null,
    isLoading: loadingCounter > 0,
  };
};

export default connect(propMap, Component);
