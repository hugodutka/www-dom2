import { quiz } from "@/reducers/quiz";
import { auth } from "@/reducers/auth";
import { flash } from "@/reducers/flash";
import { combineReducers } from "@/utils/relax";

export const rootReducer = combineReducers(["quiz", quiz], ["auth", auth], ["flash", flash]);

export default { rootReducer };
