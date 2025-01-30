import {createAction, nanoid} from "@reduxjs/toolkit";
import {Filter} from "../types/types.ts";

export const deleteTodoListAC = createAction<{id: string}>('todoLists/deleteTodolist')

export const createTodoListAC = createAction('todoLists/createTodoList', (title: string) => {
    return {payload: {title, id: nanoid()}}
})

export const updateTodoListTitleAC = createAction<{id: string, title: string}>('todoLists/updateTodoListTitle')

export const updateTodoListFilterAC = createAction<{id: string, filter: Filter}>('todoLists/updateTodoListFilter')
