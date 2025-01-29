import {Checkbox, IconButton, List, ListItem} from "@mui/material";
import {getListItemSx} from "./TodolistItem.styles.ts";
import DeleteIcon from '@mui/icons-material/Delete';
import {EditableSpan} from "./EditableSpan.tsx";
import {AddItemForm} from "./AddItemForm.tsx";
import {FilterBar} from "./FilterBar.tsx";
import {Tasks} from "./app/App.tsx";
import {useState} from "react";

type Props = {
    tlId: string
    title: string
    tasks: Tasks[]
    deleteTodoList: (id: string) => void
    createTask: (tlId: string, title: string) => void
    deleteTask: (tlId: string, taskId: string) => void
    updateTodoListTitle: (id: string, title: string) => void
    updateTaskTitle: (tlId: string, taskId: string, title: string) => void
    updateTaskIsDone: (tlId: string, taskId: string, isDone: boolean) => void
}

export type Filter = 'All' | 'Active' | 'Completed'

export function TodoListItem(
    {
        tlId,
        title,
        tasks,
        createTask,
        deleteTask,
        deleteTodoList,
        updateTaskTitle,
        updateTaskIsDone,
        updateTodoListTitle
    }
    : Props
) {

    const [filter, setFilter] = useState<Filter>('All')

    const handleToggleFilter = (filter: Filter) => setFilter(filter)

    const getTasksByFilter = () => {
        switch (filter) {
            case 'Active':
                return tasks.filter(task => !task.isDone)
            case 'Completed':
                return tasks.filter(task => task.isDone)
            default:
                return tasks
        }
    }

    let filteredTasks = getTasksByFilter()

    const handleToggleTaskStatus = (taskId: string, isDone: boolean) => updateTaskIsDone(tlId, taskId, isDone)

    const handleRemoveTodoList = () => deleteTodoList(tlId)

    const handleAddTask = (title: string) => createTask(tlId, title)

    const handleChangeTodoListTitle = (title: string) => updateTodoListTitle(tlId, title)

    const mappedTasks = filteredTasks.map(task => {

        const handleRemoveTask = () => deleteTask(tlId, task.id)

        const handleChangeTaskTitle = (title: string) => updateTaskTitle(tlId, task.id, title)

        return (
            <ListItem key={task.id}
                      sx={getListItemSx(task.isDone)}
            >
                <Checkbox checked={task.isDone}
                          onChange={e => handleToggleTaskStatus(task.id, e.currentTarget.checked)}
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
