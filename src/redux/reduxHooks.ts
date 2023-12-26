import {
  TypedUseSelectorHook,
  // useDispatch as ogDispatch,
  useSelector as ogSelector,
} from 'react-redux';
import { RootState } from './rootReducer';

// export const useDispatch = () => ogDispatch<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = ogSelector;
