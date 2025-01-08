import './App.css'
import {FilterType, TodoListItem} from "./TodoListItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm.tsx";

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
        setTasksObj(prev => ({
            ...prev,
            [todoListId]: prev[todoListId].filter(task => task.id !== taskId)}))
    }

    // Добавляет новую задачу
    const addNewTask = (newTaskTitle: string, todoListId: string) => {
        const newTask: TasksType = {id: v1(), title: newTaskTitle, isDone: false}
        /*const updatedTasks = {...tasksObj, [todoListId]: [newTask, ...tasksObj[todoListId]]}
        setTasksObj(updatedTasks)*/
        setTasksObj(prev => ({
            ...prev,
            [todoListId]: [newTask, ...prev[todoListId]]}))
    }

    // Переключает статус задачи (выполнена/не выполнена) по её ID
    const toggleTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        /*const updatedTasks = {...tasksObj, [todoListId]: tasksObj[todoListId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)}
        setTasksObj(updatedTasks)*/
        setTasksObj(prev => ({
            ...prev,
            [todoListId]: prev[todoListId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)}))
    }

    // Удаляет список задач по его ID
    const removeTodoListById = (todoListId: string) => {
        setTodoLists(prev =>
            prev.filter(tl => tl.id !== todoListId))
        delete tasksObj[todoListId]
        setTasksObj({...tasksObj})
    }

    // Добавляет новый список задач
    const addNewTodoList = (newTodoListTitle: string) => {
        const newTodoList: TodoListsType = {id: v1(), title: newTodoListTitle, filter: 'All'}
        setTodoLists(prev => [newTodoList, ...prev])
        setTasksObj(prev => ({...prev, [newTodoList.id]: []}))
    }

    // Изменяет название задачи
    const changeTaskTitle = (newTaskTitle: string, taskId: string, todoListId: string) => {
        setTasksObj(prev => ({
            ...prev,
            [todoListId]: prev[todoListId].map(t => t.id === taskId ? {...t, title: newTaskTitle} : t)}))
    }

    // Изменяет название списка задач
    const changeTodoListTitle = (newTodoListTitle: string, todoListId: string) => {
        setTodoLists(prev => (
            prev.map(tl => tl.id === todoListId ? {...tl, title: newTodoListTitle} : tl)))
    }

    // Мапит список задач для рендеринга
    const mappedTodoLists = todoLists.map(tl => {
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
                removeTodoListById={removeTodoListById}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitle}
            />
        )
    })

    return (
        <div className="app">
            <div>
                <AddItemForm addItem={addNewTodoList}/>
            </div>
            {todoLists.length
                ? <>{mappedTodoLists}</>
                : <span>Your TodoList is empty!</span>}
        </div>
    )
}