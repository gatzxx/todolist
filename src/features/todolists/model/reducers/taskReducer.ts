import {createTaskAC, deleteTaskAC, updateTaskIsDoneAC, updateTaskTitleAC} from "../actions/tasksActions.ts";
import {deleteTodoListAC, createTodoListAC} from "../actions/todoListsActions.ts";
import {createReducer, nanoid} from "@reduxjs/toolkit";
import {TasksObj} from "../types/types.ts";

const initialState: TasksObj = {}

export const taskReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTaskAC, (state, action) => {
            const {tlId, taskId} = action.payload
            const index = state[tlId].findIndex(t => t.id === taskId)
            if (index !== -1) {
                state[tlId].splice(index, 1);
            }
        })
        .addCase(createTaskAC, (state, action) => {
            const {tlId, title} = action.payload
            const newTask = {id: nanoid(), title, isDone: false}
            state[tlId].unshift(newTask)
        })
        .addCase(updateTaskIsDoneAC, (state, action) => {
            const {tlId, taskId, isDone} = action.payload
            const task = state[tlId].find(t => t.id === taskId)
            if (task) {
                task.isDone = isDone
            }
        })
        .addCase(updateTaskTitleAC, (state, action) => {
            const {tlId, taskId, title} = action.payload
            const task = state[tlId].find(t => t.id === taskId)
            if (task) {
                task.title = title
            }
        })
        .addCase(deleteTodoListAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addCase(createTodoListAC, (state, action) => {
            state[action.payload.id] = []
        })
})
