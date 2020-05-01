import { yo } from '@/reducers/yo'
import { combineReducers } from '@/utils/relax';

export const rootReducer = combineReducers(
  ["yo", yo]
);

export default { rootReducer };
