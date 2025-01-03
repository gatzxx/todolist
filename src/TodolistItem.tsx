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

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setNewTaskTitle(e.currentTarget.value)
    }

    const [error, setError] = useState<string | null>(null);

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

    const handleAddTaskOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddTask()
        }
    }

    const mappedTasks = filteredTasks.map(t => {
        const handleRemoveTask = () => removeTaskById(t.id)

        const handleToggleTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            toggleTaskStatus(t.id, e.currentTarget.checked)
        }

        return (
            <li key={t.id}>
                <Button onClick={handleRemoveTask}
                        title='X'
                />
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={handleToggleTaskStatus}
                />
                <span>{t.title}</span>
            </li>
        )
    })

    return (
        <div>
            <h3>{title}</h3>
            <div>
                {error && <div style={{color: 'red'}}>{error}</div>}
                <input value={newTaskTitle}
                       onChange={handleTitleChange}
                       onKeyDown={handleAddTaskOnEnter}
                />
                <Button onClick={handleAddTask}
                        title='+'
                />
            </div>
            {tasks.length
                ? <ul>{mappedTasks}</ul>
                : <span>Tasks list is empty</span>}
            <div>
                <Button onClick={() => handleFilterChange('All')}
                        title='All'
                />
                <Button onClick={() => handleFilterChange('Active')}
                        title='Active'
                />
                <Button onClick={() => handleFilterChange('Completed')}
                        title='Completed'
                />
            </div>
        </div>
    );
};