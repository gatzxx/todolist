import {TasksObj} from "../types/types.ts";
import {RootState} from "@/app/store.ts";

export const selectTasks = (state: RootState): TasksObj => state.tasks
