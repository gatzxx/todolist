import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";

export type Tasks = {
    id: number;
    title: string;
    isDone: boolean;
}

function App() {
    const tasks1: Tasks[] = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
    ]

    return (
        <div className="app">
            <TodolistItem title='What to learn' tasks={tasks1}/>
        </div>
    )
}

export default App
