import { Action, State } from "@/utils/relax";

const initialState = {
  name: "Hugo"
};

export const yo = (state: State = initialState, action: Action = {}) => {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.name,
      };
    default:
      return state;
  }
};

export default { yo };
