import {TasksType} from "./App.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button.tsx";

type TodolistItemPropsType = {
    title: string;
    tasks: TasksType[];
    removeTaskById: (taskId: string) => void;
    addNewTask: (newTaskTitle: string) => void;
};

type FilterType = 'All' | 'Active' | 'Completed'

export const TodolistItem = ({
                                 title,
                                 tasks,
                                 removeTaskById,
                                 addNewTask
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

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)

    const handleAddTask = () => {
        if (newTaskTitle.trim()) {
            addNewTask(newTaskTitle);
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

        return (
            <li key={t.id}>
                <Button onClick={handleRemoveTask}
                        title='X'
                />
                <input type="checkbox"
                       checked={t.isDone}
                />
                <span>{t.title}</span>
            </li>
        )
    })

    return (
        <div>
            <h3>{title}</h3>
            <div>
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