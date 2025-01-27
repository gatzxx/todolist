import {AppBar, Container, createTheme, Grid2, IconButton, Paper, Switch, ThemeProvider, Toolbar} from "@mui/material";
import {FilterType, TodoListItem} from "./TodoListItem.tsx";
import {containerSx} from "./TodolistItem.styles.ts";
import MenuIcon from '@mui/icons-material/Menu';
import {AddItemForm} from "./AddItemForm.tsx";
import {NavButton} from "./NavButton.ts";
import {useState} from "react";
import {v1} from "uuid";
import './App.css'

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListsType = {
    id: string
    title: string
    filter: FilterType
}

type TasksObjType = {
    [key: string]: TasksType[]
}

type ThemeMode = 'dark' | 'light'

export function App() {

    const todoList1 = v1()
    const todoList2 = v1()

    const initialTodoLists: TodoListsType[] = [
        {id: todoList1, title: 'Pop Stars 2000', filter: 'All'},
        {id: todoList2, title: 'Pop Stars 2010', filter: 'All'},
    ]

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

    const [todoLists, setTodoLists] = useState(initialTodoLists)

    const [tasksObj, setTasksObj] = useState(initialTasks)

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })

    const changeMode = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }

    const removeTaskById = (taskId: string, todoListId: string) => {
        setTasksObj(prev => ({
            ...prev,
            [todoListId]: prev[todoListId].filter(task => task.id !== taskId)
        }))
    }

    const addNewTask = (newTaskTitle: string, todoListId: string) => {
        const newTask: TasksType = {id: v1(), title: newTaskTitle, isDone: false}
        setTasksObj(prev => ({
            ...prev,
            [todoListId]: [newTask, ...prev[todoListId]]
        }))
    }

    const toggleTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        setTasksObj(prev => ({
            ...prev,
            [todoListId]: prev[todoListId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        }))
    }

    const removeTodoListById = (todoListId: string) => {
        setTodoLists(prev =>
            prev.filter(tl => tl.id !== todoListId))
        delete tasksObj[todoListId]
        setTasksObj({...tasksObj})
    }

    const addNewTodoList = (newTodoListTitle: string) => {
        const newTodoList: TodoListsType = {id: v1(), title: newTodoListTitle, filter: 'All'}
        setTodoLists(prev => [newTodoList, ...prev])
        setTasksObj(prev => ({...prev, [newTodoList.id]: []}))
    }

    const changeTaskTitle = (newTaskTitle: string, taskId: string, todoListId: string) => {
        setTasksObj(prev => ({
            ...prev,
            [todoListId]: prev[todoListId].map(t => t.id === taskId ? {...t, title: newTaskTitle} : t)
        }))
    }

    const changeTodoListTitle = (newTodoListTitle: string, todoListId: string) => {
        setTodoLists(prev => (
            prev.map(tl => tl.id === todoListId ? {...tl, title: newTodoListTitle} : tl)))
    }

    const mappedTodoLists = todoLists.map(tl => {

        const tasksForTodolist = tasksObj[tl.id]

        return (
            <Grid2 key={tl.id}>
                <Paper sx={{p: '0 20px 20px 20px'}}>
                    <TodoListItem id={tl.id}
                                  title={tl.title}
                                  tasks={tasksForTodolist}
                                  removeTaskById={removeTaskById}
                                  addNewTask={addNewTask}
                                  toggleTaskStatus={toggleTaskStatus}
                                  removeTodoListById={removeTodoListById}
                                  changeTaskTitle={changeTaskTitle}
                                  changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid2>

        )
    })

    return (
        <ThemeProvider theme={theme}>
            <div className="app">
                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar>
                        <Container maxWidth={'lg'} sx={containerSx}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <div>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                                <Switch color={'default'} onChange={changeMode}/>
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>

                <Container maxWidth={'lg'}>
                    <Grid2 container sx={{mb: '30px'}}>
                        <AddItemForm addItem={addNewTodoList}/>
                    </Grid2>

                    <Grid2 container spacing={4}>
                        {
                            todoLists.length
                                ? <>{mappedTodoLists}</>
                                : <span>Your TodoList is empty!</span>
                        }
                    </Grid2>
                </Container>
            </div>
        </ThemeProvider>
    )
}
