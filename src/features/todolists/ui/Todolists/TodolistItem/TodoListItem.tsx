import {TodoListTitle} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodoListTitle.tsx";
import {Tasks} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx";
import {createTaskAC} from "@/features/todolists/model/actions/tasksActions.ts";
import {AddItemForm} from "@/common/components/AddItemForm/AddItemForm.tsx";
import {Filter} from "@/features/todolists/model/types/types.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {FilterBar} from "./FilterBar/FilterBar.tsx";

type Props = {
    tlId: string
    title: string
    filter: Filter
}

export function TodoListItem(
    {
        tlId,
        title,
        filter,
    }
    : Props
) {

    const dispatch = useAppDispatch()

    const createTask = (title: string) => {
        dispatch(createTaskAC({tlId, title}))
    }

    return (
        <div>
            <TodoListTitle tlId={tlId}
                           title={title}
            />

            <AddItemForm addItem={createTask}/>

            <Tasks tlId={tlId}
                   filter={filter}
            />

            <FilterBar tlId={tlId}
                       filter={filter}
            />
        </div>
    )
}
