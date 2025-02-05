import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {todoListReducer} from "@/features/todolists/model/reducers/todoListReducer.ts";
import {taskReducer} from "@/features/todolists/model/reducers/taskReducer.ts";
import {appReducer} from "./appReducer.ts";


const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: taskReducer,
    app: appReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
