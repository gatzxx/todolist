import {TasksType} from "./App.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button.tsx";

type TodolistItemPropsType = {
    title: string;
    tasks: TasksType[];
    removeTaskById: (taskId: string) => void;
    addNewTask: (newTaskTitle: string) => void;
    toggleTaskStatus: (taskId: string, isDone: boolean) => void;
};

type FilterType = 'All' | 'Active' | 'Completed'

export const TodolistItem = ({
                                 title,
                                 tasks,
                                 removeTaskById,
                                 addNewTask,
                                 toggleTaskStatus
                             }: TodolistItemPropsType) => {

    // Состояние для хранения текущего фильтра
    const [filter, setFilter] = useState<FilterType>('All')

    // Состояние для хранения ошибки (если заголовок задачи пустой)
    const [error, setError] = useState<string | null>(null);

    // Состояние для хранения заголовка новой задачи
    const [newTaskTitle, setNewTaskTitle] = useState('')

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

    // Обрабатывает изменение значения в поле ввода заголовка задачи
    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    // Добавляет новую задачу, если заголовок не пустой
    const handleAddTask = () => {
        const trimmedTitle = newTaskTitle.trim()

        if (trimmedTitle !== '') {
            addNewTask(trimmedTitle);
            setNewTaskTitle('');
            setError(null);
        } else {
            setError("Task title cannot be empty or contain only spaces!");
            setNewTaskTitle('');
        }
    }

    // Обрабатывает добавление задачи при нажатии клавиши Enter
    const handleAddTaskOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            handleAddTask()
        }
    }

    // Переключает статус задачи (выполнена/не выполнена)
    const handleToggleTaskStatus = (taskId: string, isDone: boolean) => {
        toggleTaskStatus(taskId, isDone)
    }

    // Мапит отфильтрованные задачи в элементы списка
    const mappedTasks = filteredTasks.map(t => {
        // Удаляет задачу по её ID
        const handleRemoveTask = () => removeTaskById(t.id)

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
                <span>{t.title}</span>
            </li>
        )
    })

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input className={error ? 'error' : ''}
                       value={newTaskTitle}
                       onChange={handleTitleChange}
                       onKeyDown={handleAddTaskOnEnter}
                />
                <Button onClick={handleAddTask}
                        title='+'
                />
                {error && <div className={'errorMessage'}>{error}</div>}
            </div>
            {tasks.length
                ? <ul>{mappedTasks}</ul>
                : <span>Your task list is empty!</span>}
            <div>
                <Button className={filter === 'All' ? 'activeFilter' : ''}
                        title='All'
                        onClick={() => handleFilterChange('All')}
                />
                <Button className={filter === 'Active' ? 'activeFilter' : ''}
                        title='Active'
                        onClick={() => handleFilterChange('Active')}
                />
                <Button className={filter === 'Completed' ? 'activeFilter' : ''}
                        title='Completed'
                        onClick={() => handleFilterChange('Completed')}
                />
            </div>
        </div>
    );
};