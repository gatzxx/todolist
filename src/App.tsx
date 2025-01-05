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

    // Состояние для хранения списка задач
    const [tasks, setTasks] = useState<TasksType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: true},
        {id: v1(), title: 'TypeScript', isDone: false},
    ]);

    // Удаляет задачу по её ID
    const removeTaskById = (taskId: string) => {
        setTasks(tasks.filter((task: TasksType) => task.id !== taskId))
    }

    // Добавляет новую задачу в список
    const addNewTask = (newTaskTitle: string) => {
        const newTask: TasksType = {id: v1(), title: newTaskTitle, isDone: false}
        setTasks(prev => [newTask, ...prev])
    }

    // Переключает статус задачи (выполнена/не выполнена) по её ID
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