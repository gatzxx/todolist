import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
}

export function App() {
    const [tasks, setTasks] = useState<TasksType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false}
    ]);

    const removeTaskById = (taskId: string) => {
        setTasks(tasks.filter((task: TasksType) => task.id !== taskId))
    }

    const addNewTask = (newTaskTitle: string) => {
        const newTask: TasksType = {id: v1(), title: newTaskTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const toggleTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t))
    }

    return (
        <div className="app">
            <TodolistItem
                title='What to learn'
                tasks={tasks}
                removeTaskById={removeTaskById}
                addNewTask={addNewTask}
                toggleTaskStatus={toggleTaskStatus}
            />
        </div>
    )
}