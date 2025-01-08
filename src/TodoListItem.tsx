import {TasksType} from "./App.tsx";
import {useState} from "react";
import {Button} from "./Button.tsx";
import {AddItemForm} from "./AddItemForm.tsx";
import {FilterBar} from "./FilterBar.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

type TodolistItemPropsType = {
    id: string,
    title: string;
    tasks: TasksType[];
    removeTaskById: (taskId: string, todoListId: string) => void;
    addNewTask: (newTaskTitle: string, todoListId: string) => void;
    toggleTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
    removeTodoListById: (todoListId: string) => void
    changeTaskTitle: (newTaskTitle: string, taskId: string, todoListId: string) => void
    changeTodoListTitle: (newTodoListTitle: string, todoListId: string) => void
};

export type FilterType = 'All' | 'Active' | 'Completed'

export function TodoListItem({
                                 id,
                                 title,
                                 tasks,
                                 removeTaskById,
                                 addNewTask,
                                 toggleTaskStatus,
                                 removeTodoListById,
                                 changeTaskTitle,
                                 changeTodoListTitle
                             }: TodolistItemPropsType) {

    // Состояние для хранения текущего фильтра
    const [filter, setFilter] = useState<FilterType>('All')

    // Устанавливает выбранный фильтр
    const handleFilterChange = (filter: FilterType) => setFilter(filter)

    // Возвращает отфильтрованный список задач в зависимости от выбранного фильтра
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

    // Переменная с отфильтрованными задачами
    let filteredTasks = getTasksByFilter()

    // Переключает статус задачи (выполнена/не выполнена)
    const handleToggleTaskStatus = (taskId: string, isDone: boolean) => {
        toggleTaskStatus(taskId, isDone, id)
    }

    // Удаляет список задачи по его ID
    const handleRemoveTodoList = () => {
        removeTodoListById(id)
    }

    // Добовляет новую задачу
    const handleAddTask = (value: string) => {
        addNewTask(value, id)
    }

    // Изменяет название списка задач
    const handleChangeTitle = (value: string) => {
        changeTodoListTitle(value, id)
    }

    // Мапит отфильтрованные задачи в элементы списка
    const mappedTasks = filteredTasks.map(t => {
        // Удаляет задачу по её ID
        const handleRemoveTask = () => removeTaskById(t.id, id)

        // Изменяет название задачи
        const handleChangeTitle = (value: string) => {
            changeTaskTitle(value, t.id, id)
        }

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
                <EditableSpan title={t.title} onTitleChange={handleChangeTitle}/>
            </li>
        )
    })

    return (
        <div>
            <div>
                <Button title={'X'} onClick={handleRemoveTodoList}/>
                <EditableSpan title={title} onTitleChange={handleChangeTitle}/>
            </div>
            <AddItemForm addItem={handleAddTask}/>
            <div>
                {tasks.length
                    ? <ul>{mappedTasks}</ul>
                    : <span>Your TaskList is empty!</span>}
            </div>
            <FilterBar filter={filter} handleFilterChange={handleFilterChange}/>
        </div>
    )
}