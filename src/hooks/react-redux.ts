import { TypedUseSelectorHook, useSelector as selectorHook, useDispatch as dispatchHook, } from 'react-redux';
import { RootState,  AppDispatch, AppThunk } from '../types/type';

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();