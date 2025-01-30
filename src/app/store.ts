import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {todoListReducer} from "../model/reducers/todoListReducer.ts";
import {taskReducer} from "../model/reducers/taskReducer.ts";


const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: taskReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
