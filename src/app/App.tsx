import {AppBar, Container, createTheme, Grid2, IconButton, Paper, Switch, ThemeProvider, Toolbar} from "@mui/material";
import {
    createTodoListAC,
    deleteTodoListAC,
    todoListReducer,
    updateTodoListTitleAC
} from "../model/todoListReducer.ts";
import {
    createTaskAC,
    deleteTaskAC,
    taskReducer,
    updateTaskIsDoneAC,
    updateTaskTitleAC
} from "../model/taskReducer.ts";
import {Filter, TodoListItem} from "../TodoListItem.tsx";
import {containerSx} from "../TodolistItem.styles.ts";
import MenuIcon from '@mui/icons-material/Menu';
import {AddItemForm} from "../AddItemForm.tsx";
import {useReducer, useState} from "react";
import {NavButton} from "../NavButton.ts";
import './App.css'

export type Tasks = {
    id: string
    title: string
    isDone: boolean
}

export type TodoLists = {
    id: string
    title: string
    filter: Filter
}

export type TasksObj = {
    [key: string]: Tasks[]
}

type ThemeMode = 'dark' | 'light'

export function App() {

    const [todoLists, dispatchToTodoLists] = useReducer(todoListReducer, [])
    const [tasks, dispatchToTasks] = useReducer(taskReducer, {})
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })

    const toggleThemeMode = () => setThemeMode(themeMode == 'light' ? 'dark' : 'light')

    const deleteTask = (tlId: string, taskId: string) => {
        dispatchToTasks(deleteTaskAC({tlId, taskId}))
    }

    const createTask = (tlId: string, title: string) => {
        dispatchToTasks(createTaskAC({tlId, title}))
    }

    const updateTaskIsDone = (tlId: string, taskId: string, isDone: boolean) => {
        dispatchToTasks(updateTaskIsDoneAC({tlId, taskId, isDone}))
    }

    const updateTaskTitle = (tlId: string, taskId: string, title: string) => {
        dispatchToTasks(updateTaskTitleAC({tlId, taskId, title}))
    }

    const deleteTodoList = (id: string) => {
        const action = deleteTodoListAC(id)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    const createTodoList = (title: string) => {
        const action = createTodoListAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    const updateTodoListTitle = (id: string, title: string) => {
        dispatchToTodoLists(updateTodoListTitleAC({id, title}))
    }

    const mappedTodoLists = todoLists.map(tl => {

        const tasksForTodoList = tasks[tl.id]

        return (
            <Grid2 key={tl.id}>
                <Paper sx={{p: '0 20px 20px 20px'}}>
                    <TodoListItem tlId={tl.id}
                                  title={tl.title}
                                  tasks={tasksForTodoList}
                                  createTask={createTask}
                                  deleteTask={deleteTask}
                                  updateTaskIsDone={updateTaskIsDone}
                                  updateTaskTitle={updateTaskTitle}
                                  deleteTodoList={deleteTodoList}
                                  updateTodoListTitle={updateTodoListTitle}
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
                                <Switch color={'default'} onChange={toggleThemeMode}/>
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>

                <Container maxWidth={'lg'}>
                    <Grid2 container sx={{mb: '30px'}}>
                        <AddItemForm addItem={createTodoList}/>
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
