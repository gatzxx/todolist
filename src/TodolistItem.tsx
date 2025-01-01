import {TasksType} from "./App.tsx";
import {useState} from "react";

type TodolistItemPropsType = {
    title: string;
    tasks: TasksType[];
    removeTask: (taskId: number) => void;
};

type FilterType = 'All' | 'Active' | 'Completed'

export const TodolistItem = (
    {title, tasks, removeTask}: TodolistItemPropsType) => {

    const [filter, setFilter] = useState<FilterType>('All')

    const handleFilterChange = (filter: FilterType) => {
        setFilter(filter)
    }

    const getFilteredTasks = () => {
        switch (filter) {
            case 'Active': {
                return tasks.filter((task) => !task.isDone)
            }
            case 'Completed': {
                return tasks.filter((task) => task.isDone)
            }
            default:
                return tasks
        }
    }

    let filteredTasks = getFilteredTasks()

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            {tasks.length
                ? <ul>
                    {filteredTasks.map(task => {
                        return (
                            <li key={task.id}>
                                <button onClick={()=> removeTask(task.id)}>X</button>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                            </li>
                        )
                    })}
                </ul>
                : <span>Tasks list is empty</span>}
            <div>
                <button onClick={() => handleFilterChange('All')}>All</button>
                <button onClick={() => handleFilterChange('Active')}>Active</button>
                <button onClick={() => handleFilterChange('Completed')}>Completed</button>
            </div>
        </div>
    );
};