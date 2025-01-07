import './App.css'
import {FilterType, TodoListItem} from "./TodoListItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
}

type TodoListsType = {
    id: string
    title: string
    filter: FilterType
}

type TasksObjType = {
    [key: string]: TasksType[];
}

export function App() {

    // Генерация уникальных ID для списков задач
    const todoList1 = v1()
    const todoList2 = v1()

    // Переменная с начальным состоянием списка задач
    const initialTodoLists: TodoListsType[] = [
        {id: todoList1, title: 'Pop Stars 2000', filter: 'All'},
        {id: todoList2, title: 'Pop Stars 2010', filter: 'All'},
    ]

    // Переменная с начальным состоянием задач, сгруппированных по ID списков задач
    const initialTasks: TasksObjType = {
        [todoList1]: [
            {id: v1(), title: 'Britney Spears', isDone: true},
            {id: v1(), title: 'Nirvana', isDone: false},
            {id: v1(), title: 'Backstreet Boys', isDone: true},
            {id: v1(), title: 'Spice Girls', isDone: false},
        ],
        [todoList2]: [
            {id: v1(), title: 'Eminem', isDone: true},
            {id: v1(), title: 'Rihanna', isDone: false},
            {id: v1(), title: 'Justin Bieber', isDone: true},
        ]
    }

    // Состояние для хранения списков задач
    const [todoLists, setTodoLists] = useState(initialTodoLists)

    // Состояние для хранения задач, сгруппированных по ID списков задач
    const [tasksObj, setTasksObj] = useState(initialTasks)

    // Удаляет задачу по её ID
    const removeTaskById = (taskId: string, todoListId: string) => {
        /*const updatedTasks = {...tasksObj, [todoListId]: tasksObj[todoListId].filter(task => task.id !== taskId)}
        setTasksObj(updatedTasks);*/
        setTasksObj(prev => ({...prev, [todoListId]: prev[todoListId].filter(task => task.id !== taskId)}))
    }

    // Добавляет новую задачу
    const addNewTask = (newTaskTitle: string, todoListId: string) => {
        const newTask: TasksType = {id: v1(), title: newTaskTitle, isDone: false}
        /*const updatedTasks = {...tasksObj, [todoListId]: [newTask, ...tasksObj[todoListId]]}
        setTasksObj(updatedTasks)*/
        setTasksObj(prev => ({...prev, [todoListId]: [newTask, ...prev[todoListId]]}))
    }

    // Переключает статус задачи (выполнена/не выполнена) по её ID
    const toggleTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        /*const updatedTasks = {...tasksObj, [todoListId]: tasksObj[todoListId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)}
        setTasksObj(updatedTasks)*/
        setTasksObj(prev => ({...prev, [todoListId]: prev[todoListId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)}))
    }

    return (
        <div className="app">
            {todoLists.map(tl => {
                const tasksForTodolist = tasksObj[tl.id]

                return (
                    <TodoListItem
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTaskById={removeTaskById}
                        addNewTask={addNewTask}
                        toggleTaskStatus={toggleTaskStatus}
                    />
                )
            })}
        </div>
    )
}