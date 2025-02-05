import {selectTasks} from "@/features/todolists/model/selectors/tasksSelectors.ts";
import {TaskItem} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx";
import {Filter} from "@/features/todolists/model/types/types.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {List} from "@mui/material";

type Props = {
    tlId: string
    filter: Filter
}

export const Tasks = (
    {
        tlId,
        filter,
    }
    : Props
) => {

    const tasks = useAppSelector(selectTasks)

    const tasksForTodoList = tasks[tlId]

    const getTasksByFilter = () => {
        switch (filter) {
            case 'Active':
                return tasksForTodoList.filter(task => !task.isDone)
            case 'Completed':
                return tasksForTodoList.filter(task => task.isDone)
            default:
                return tasksForTodoList
        }
    }

    let filteredTasks = getTasksByFilter()

    const mappedTasks = filteredTasks.map(task => {
        return (
            <TaskItem key={task.id}
                      tlId={tlId}
                      task={task}
            />
        )
    })

    return (
        <div>
            {
                filteredTasks.length
                    ? <List>{mappedTasks}</List>
                    : <span>Your Task List is empty!</span>
            }
        </div>
    )
}
