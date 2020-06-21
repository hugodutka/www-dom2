import { Action, State } from "@/utils/relax";
import { LOGIN_SUCCESS } from "@/actions/auth";

const initialState = {
  username: null,
};

export const auth = (state: State = initialState, action: Action = {}): State => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        username: action.username,
      };
    }
    default: {
      return state;
    }
  }
};

export default { auth };
