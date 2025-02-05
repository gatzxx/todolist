import {deleteTaskAC, updateTaskIsDoneAC, updateTaskTitleAC} from "@/features/todolists/model/actions/tasksActions.ts";
import {getListItemSx} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles.ts";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {Task} from "@/features/todolists/model/types/types.ts";
import {ChangeEvent} from "react";

type Props = {
    tlId: string
    task: Task
}

export const TaskItem = (
    {
        tlId,
        task
    }
    : Props
) => {
    const dispatch = useAppDispatch()

    const deleteTask = () => {
        dispatch(deleteTaskAC({tlId, taskId: task.id}))
    }

    const updateTaskIsDone = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskIsDoneAC({tlId, taskId: task.id, isDone: e.currentTarget.checked}))
    }

    const updateTaskTitle = (title: string) => {
        dispatch(updateTaskTitleAC({tlId, taskId: task.id, title}))
    }

    return (
        <div>
            <ListItem key={task.id}
                      sx={getListItemSx(task.isDone)}
            >
                <Checkbox checked={task.isDone}
                          onChange={updateTaskIsDone}
                />

                <EditableSpan title={task.title}
                              onTitleChange={updateTaskTitle}
                />

                <IconButton>
                    <DeleteIcon onClick={deleteTask}/>
                </IconButton>
            </ListItem>
        </div>
    )
}
