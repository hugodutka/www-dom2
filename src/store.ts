import { Store } from '@/utils/relax'
import { rootReducer } from '@/reducers'

export const store = new Store(rootReducer);

export default { store };
