import {Checkbox, IconButton, List, ListItem} from "@mui/material";
import {getListItemSx} from "../styles/TodolistItem.styles.ts";
import {Task, Filter} from "../../model/types/types.ts";
import DeleteIcon from '@mui/icons-material/Delete';
import {EditableSpan} from "./EditableSpan.tsx";
import {AddItemForm} from "./AddItemForm.tsx";
import {FilterBar} from "./FilterBar.tsx";

type Props = {
    tlId: string
    title: string
    tasks: Task[]
    filter: Filter
    deleteTodoList: (id: string) => void
    createTask: (payload: {tlId: string, title: string}) => void
    deleteTask: (payload: {tlId: string, taskId: string}) => void
    updateTodoListTitle: (payload: {id: string, title: string}) => void
    updateTodoListFilter: (payload: {id: string, filter: Filter}) => void
    updateTaskTitle: (payload: {tlId: string, taskId: string, title: string}) => void
    updateTaskIsDone: (payload: {tlId: string, taskId: string, isDone: boolean}) => void
}

export function TodoListItem(
    {
        tlId,
        title,
        tasks,
        filter,
        createTask,
        deleteTask,
        deleteTodoList,
        updateTaskTitle,
        updateTaskIsDone,
        updateTodoListTitle,
        updateTodoListFilter
    }
    : Props
) {

    const handleToggleFilter = (filter: Filter) => {
        updateTodoListFilter({id: tlId, filter})
    }

    const handleToggleTaskStatus = (payload: {taskId: string, isDone: boolean}) => {
        updateTaskIsDone({tlId, ...payload})
    }

    const handleRemoveTodoList = () => {
        deleteTodoList(tlId)
    }

    const handleAddTask = (title: string) => {
        createTask({tlId, title})
    }

    const handleChangeTodoListTitle = (title: string) => {
        updateTodoListTitle({id: tlId, title})
    }

    const mappedTasks = tasks.map(task => {

        const handleRemoveTask = () => {
            deleteTask({tlId, taskId: task.id})
        }

        const handleChangeTaskTitle = (title: string) => {
            updateTaskTitle({tlId, taskId: task.id, title})
        }

        return (
            <ListItem key={task.id}
                      sx={getListItemSx(task.isDone)}
            >
                <Checkbox checked={task.isDone}
                          onChange={e => handleToggleTaskStatus({taskId: task.id, isDone: e.currentTarget.checked})}
                />

                <EditableSpan title={task.title}
                              onTitleChange={handleChangeTaskTitle}
                />

                <IconButton>
                    <DeleteIcon onClick={handleRemoveTask}/>
                </IconButton>
            </ListItem>
        )
    })

    return (
        <div>
            <div>

                <EditableSpan title={title}
                              onTitleChange={handleChangeTodoListTitle}
                />

                <IconButton>
                    <DeleteIcon onClick={handleRemoveTodoList}/>
                </IconButton>
            </div>

            <AddItemForm addItem={handleAddTask}/>

            <div>
                {
                    tasks.length
                        ? <List>{mappedTasks}</List>
                        : <span>Your TaskList is empty!</span>
                }
            </div>

            <FilterBar filter={filter}
                       handleToggleFilter={handleToggleFilter}
            />
        </div>
    )
}
