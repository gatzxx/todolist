import {createAction} from "@reduxjs/toolkit";

export const deleteTaskAC = createAction<{tlId: string, taskId: string}>('tasks/deleteTask')

export const createTaskAC = createAction<{tlId: string, title: string}>('tasks/createTask')

export const updateTaskIsDoneAC = createAction<{tlId: string, taskId: string, isDone: boolean}>('tasks/updateTaskIsDone')

export const updateTaskTitleAC = createAction<{ tlId: string, taskId: string, title: string }>('tasks/updateTaskTitle')
