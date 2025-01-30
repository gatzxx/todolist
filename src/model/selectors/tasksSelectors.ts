import {RootState} from "../../app/store.ts";
import {TasksObj} from "../types/types.ts";

export const selectTasks = (state: RootState): TasksObj => state.tasks
