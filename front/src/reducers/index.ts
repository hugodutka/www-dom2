import { quiz } from "@/reducers/quiz";
import { auth } from "@/reducers/auth";
import { combineReducers } from "@/utils/relax";

export const rootReducer = combineReducers(["quiz", quiz], ["auth", auth]);

export default { rootReducer };
