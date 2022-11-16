import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import usersReducer from '../store/users/index'
import {usersSaga} from "./users/saga";
import {TypedUseSelectorHook, useSelector} from "react-redux";

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: (getDefaultMiddleWare) => [...getDefaultMiddleWare({thunk:false}), sagaMiddleware]
})

sagaMiddleware.run(usersSaga)

export type RootState = ReturnType<typeof store.getState>
export const action = (type: string, payload?: any) => store.dispatch({type, payload})

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
