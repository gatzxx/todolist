import {TodoLists} from "../app/App.tsx"
import {v1} from "uuid";

const initialState: TodoLists[] = []

export const todoListReducer = (state: TodoLists[] = initialState, action: Action): TodoLists[] => {
    switch (action.type) {
        case 'DELETE_TODOLIST': {
            const {id} = action.payload
            return state.filter(tl => tl.id !== id)
        }
        case 'CREATE_TODOLIST': {
            const {id, title} = action.payload
            const newTodoList: TodoLists = {id, title, filter: 'All'}
            return [...state, newTodoList]
        }
        case 'UPDATE_TODOLIST_TITLE': {
            const {id, title} = action.payload
            return state.filter(tl => tl.id === id ? {...tl, title} : tl)
        }
        default:
            return state
    }
}

export const deleteTodoListAC = (id: string) => {
    return {type: 'DELETE_TODOLIST', payload: {id}} as const
}

export const createTodoListAC = (title: string ) => {
    return {type: 'CREATE_TODOLIST', payload: {id: v1(), title}} as const
}

export const updateTodoListTitleAC = (payload: { id: string, title: string }) => {
    return {type: 'UPDATE_TODOLIST_TITLE', payload} as const
}

export type DeleteTodoListAction = ReturnType<typeof deleteTodoListAC>
export type CreateTodoListAction = ReturnType<typeof createTodoListAC>
type UpdateTodoListTitleAction = ReturnType<typeof updateTodoListTitleAC>

type Action = DeleteTodoListAction | CreateTodoListAction | UpdateTodoListTitleAction
