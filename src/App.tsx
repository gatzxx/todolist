import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";

export type TasksType = {
    id: number;
    title: string;
    isDone: boolean;
}

function App() {
    const [tasks, setTasks] = useState<TasksType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false}
    ]);

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter((task: TasksType) => task.id !== taskId))
    }

    return (
        <div className="app">
            <TodolistItem
                title='What to learn'
                tasks={tasks}
                removeTask={removeTask}
            />
        </div>
    )
}

export default App
