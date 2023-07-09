import {TypedUseSelectorHook, useSelector, useDispatch} from 'react-redux'
import { RootState, AppDispatch } from './redux/store';

type DispatchFunc =() => AppDispatch

export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: DispatchFunc = useDispatch