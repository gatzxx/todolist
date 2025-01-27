import {Checkbox, IconButton, List, ListItem} from "@mui/material";
import {getListItemSx} from "./TodolistItem.styles.ts";
import DeleteIcon from '@mui/icons-material/Delete';
import {EditableSpan} from "./EditableSpan.tsx";
import {AddItemForm} from "./AddItemForm.tsx";
import {FilterBar} from "./FilterBar.tsx";
import {TasksType} from "./App.tsx";
import {useState} from "react";

type TodolistItemPropsType = {
    id: string
    title: string
    tasks: TasksType[]
    removeTodoListById: (todoListId: string) => void
    removeTaskById: (taskId: string, todoListId: string) => void
    addNewTask: (newTaskTitle: string, todoListId: string) => void
    changeTodoListTitle: (newTodoListTitle: string, todoListId: string) => void
    toggleTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (newTaskTitle: string, taskId: string, todoListId: string) => void
}

export type FilterType = 'All' | 'Active' | 'Completed'

export function TodoListItem(
    {
        id,
        title,
        tasks,
        addNewTask,
        removeTaskById,
        changeTaskTitle,
        toggleTaskStatus,
        removeTodoListById,
        changeTodoListTitle
    }
    : TodolistItemPropsType
) {

    const [filter, setFilter] = useState<FilterType>('All')

    const handleFilterChange = (filter: FilterType) => setFilter(filter)

    const getTasksByFilter = () => {
        switch (filter) {
            case 'Active':
                return tasks.filter(t => !t.isDone)
            case 'Completed':
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    let filteredTasks = getTasksByFilter()

    const handleToggleTaskStatus = (taskId: string, isDone: boolean) => toggleTaskStatus(taskId, isDone, id)


    const handleRemoveTodoList = () => removeTodoListById(id)


    const handleAddTask = (value: string) => addNewTask(value, id)


    const handleChangeTitle = (value: string) => changeTodoListTitle(value, id)


    const mappedTasks = filteredTasks.map(t => {

        const handleRemoveTask = () => removeTaskById(t.id, id)

        const handleChangeTitle = (value: string) => changeTaskTitle(value, t.id, id)

        return (
            <ListItem key={t.id}
                      sx={getListItemSx(t.isDone)}
            >
                <Checkbox checked={t.isDone}
                          onChange={e => handleToggleTaskStatus(t.id, e.currentTarget.checked)}
                />

                <EditableSpan title={t.title}
                              onTitleChange={handleChangeTitle}
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
                              onTitleChange={handleChangeTitle}
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
                       handleFilterChange={handleFilterChange}
            />
        </div>
    )
}
