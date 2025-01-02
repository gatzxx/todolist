import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
}

function App() {
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

    return (
        <div className="app">
            <TodolistItem
                title='What to learn'
                tasks={tasks}
                removeTaskById={removeTaskById}
                addNewTask={addNewTask}
            />
        </div>
    )
}

export default App