import { Action, State } from "@/utils/relax";
import { PUT_FLASH, REMOVE_FLASH } from "@/actions/flash";

const initialState = {
  messages: {},
};

export const flash = (state: State = initialState, action: Action = {}): State => {
  switch (action.type) {
    case PUT_FLASH: {
      const newState = { ...state, messages: { ...state.messages } };
      const { id, text, variant } = action;
      newState.messages[id] = { id, text, variant };
      return newState;
    }
    case REMOVE_FLASH: {
      const newState = { ...state, messages: { ...state.messages } };
      delete newState.messages[action.id];
      return newState;
    }
    default: {
      return state;
    }
  }
};
