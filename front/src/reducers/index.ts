import { quiz } from '@/reducers/quiz'
import { combineReducers } from '@/utils/relax';

export const rootReducer = combineReducers(
  ["quiz", quiz]
);

export default { rootReducer };
