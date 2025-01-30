import {RootState} from "../../app/store.ts";
import {TodoList} from "../types/types.ts";

export const selectTodoLists = (state: RootState): TodoList[] => state.todoLists
