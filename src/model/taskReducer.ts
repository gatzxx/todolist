import {TasksObj} from "../app/App.tsx";
import {v1} from "uuid";
import {CreateTodoListAction, DeleteTodoListAction} from "./todoListReducer.ts";

const initialState: TasksObj = {}

export const taskReducer = (state: TasksObj = initialState, action: Action): TasksObj => {
    switch (action.type) {
        case 'DELETE_TASK': {
            const {tlId, taskId} = action.payload
            return {...state, [tlId]: state[tlId].filter(t => t.id !== taskId)}
        }
        case 'CREATE_TASK': {
            const {tlId, title} = action.payload
            const newTask = {id: v1(), title, isDone: false}
            return {...state, [tlId]: [newTask, ...state[tlId]]}
        }
        case 'UPDATE_TASK_IsDONE': {
            const {tlId, taskId, isDone} = action.payload
            return {...state, [tlId]: state[tlId].map(t => t.id === taskId ? {...t, isDone} : t)}
        }
        case 'UPDATE_TASK_TITLE': {
            const {tlId, taskId, title} = action.payload
            return {...state, [tlId]: state[tlId].map(t => t.id === taskId ? {...t, title} : t)}
        }
        case 'DELETE_TODOLIST': {
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
        }
        case 'CREATE_TODOLIST': {
            const {id} = action.payload
            return {...state, [id]: []}
        }
        default:
            return state
    }
}

export const deleteTaskAC = (payload: { tlId: string, taskId: string }) => {
    return {type: 'DELETE_TASK', payload} as const
}

export const createTaskAC = (payload: { tlId: string, title: string }) => {
    return {type: 'CREATE_TASK', payload} as const
}

export const updateTaskIsDoneAC = (payload: { tlId: string, taskId: string, isDone: boolean }) => {
    return {type: 'UPDATE_TASK_IsDONE', payload} as const
}

export const updateTaskTitleAC = (payload: { tlId: string, taskId: string, title: string }) => {
    return {type: 'UPDATE_TASK_TITLE', payload} as const
}

type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
type CreateTaskAction = ReturnType<typeof createTaskAC>
type UpdateTaskIsDoneAction = ReturnType<typeof updateTaskIsDoneAC>
type UpdateTaskTitleAction = ReturnType<typeof updateTaskTitleAC>

type Action =
    | DeleteTaskAction
    | CreateTaskAction
    | UpdateTaskIsDoneAction
    | UpdateTaskTitleAction
    | DeleteTodoListAction
    | CreateTodoListAction
