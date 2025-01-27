import {EditableSpan} from "./EditableSpan.tsx";
import {AddItemForm} from "./AddItemForm.tsx";
import {FilterBar} from "./FilterBar.tsx";
import {Button} from "./Button.tsx";
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
            <li key={t.id}
                className={t.isDone ? 'isDone' : ''}
            >
                <Button onClick={handleRemoveTask}
                        title='X'
                />
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={e => handleToggleTaskStatus(t.id, e.currentTarget.checked)}
                />
                <EditableSpan title={t.title}
                              onTitleChange={handleChangeTitle}
                />
            </li>
        )
    })

    return (
        <div>
            <div>
                <Button title={'X'}
                        onClick={handleRemoveTodoList}
                />
                <EditableSpan title={title}
                              onTitleChange={handleChangeTitle}
                />
            </div>

            <AddItemForm addItem={handleAddTask}/>

            <div>
                {
                    tasks.length
                        ? <ul>{mappedTasks}</ul>
                        : <span>Your TaskList is empty!</span>
                }
            </div>

            <FilterBar filter={filter}
                       handleFilterChange={handleFilterChange}
            />
        </div>
    )
}
