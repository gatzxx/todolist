import {createTodoListAC, deleteTodoListAC, updateTodoListFilterAC, updateTodoListTitleAC} from "../actions/todoListsActions.ts";
import {createReducer} from "@reduxjs/toolkit";
import {TodoList} from "../types/types.ts";

const initialState: TodoList[] = []

export const todoListReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTodoListAC, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        })
        .addCase(createTodoListAC, (state, action) => {
            state.push({ ...action.payload, filter: 'All' })
        })
        .addCase(updateTodoListTitleAC, (state, action) => {
            const {id, title} = action.payload
            const index = state.findIndex(tl => tl.id === id)
            if (index !== -1) {
                state[index].title = title
            }
        })
        .addCase(updateTodoListFilterAC, (state, action) => {
            const {id, filter} = action.payload
            const todoList = state.find(tl => tl.id === id)
            if (todoList) {
                todoList.filter = filter
            }
        })
})
