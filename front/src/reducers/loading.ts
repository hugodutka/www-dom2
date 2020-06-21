import { Action, State } from "@/utils/relax";
import { PUSH_LOADING, POP_LOADING } from "@/actions/loading";

const initialState = {
  loadingCounter: 0,
};

export const loading = (state: State = initialState, action: Action = {}): State => {
  switch (action.type) {
    case PUSH_LOADING: {
      return {
        ...state,
        loadingCounter: state.loadingCounter + 1,
      };
    }
    case POP_LOADING: {
      return {
        ...state,
        loadingCounter: state.loadingCounter - 1,
      };
    }
    default: {
      return state;
    }
  }
};
