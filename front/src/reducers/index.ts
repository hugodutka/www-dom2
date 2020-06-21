import { quiz } from "@/reducers/quiz";
import { auth } from "@/reducers/auth";
import { flash } from "@/reducers/flash";
import { loading } from "@/reducers/loading";
import { combineReducers } from "@/utils/relax";

export const rootReducer = combineReducers(
  ["quiz", quiz],
  ["auth", auth],
  ["flash", flash],
  ["loading", loading]
);

export default { rootReducer };
