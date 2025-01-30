import {createTodoListAC, deleteTodoListAC, updateTodoListFilterAC, updateTodoListTitleAC} from "../model/actions/todoListsActions.ts";
import {AppBar, Container, createTheme, Grid2, IconButton, Paper, Switch, ThemeProvider, Toolbar} from "@mui/material";
import {createTaskAC, deleteTaskAC, updateTaskIsDoneAC, updateTaskTitleAC} from "../model/actions/tasksActions.ts";
import {selectTodoLists} from "../model/selectors/todoListsSelectors.ts";
import {containerSx} from "../common/styles/TodolistItem.styles.ts";
import {TodoListItem} from "../common/components/TodoListItem.tsx";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";
import {selectTasks} from "../model/selectors/tasksSelectors.ts";
import {AddItemForm} from "../common/components/AddItemForm.tsx";
import {NavButton} from "../common/styles/NavButton.ts";
import MenuIcon from '@mui/icons-material/Menu';
import {Filter} from "../model/types/types.ts";
import {useState} from "react";
import './App.css'

type ThemeMode = 'dark' | 'light'

export function App() {

    const todoLists = useAppSelector(selectTodoLists)
    const tasks = useAppSelector(selectTasks)
    const dispatch = useAppDispatch()

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

    const deleteTask = (payload: {tlId: string, taskId: string}) => {
        dispatch(deleteTaskAC(payload))
    }

    const createTask = (payload: {tlId: string, title: string}) => {
        dispatch(createTaskAC(payload))
    }

    const updateTaskIsDone = (payload: {tlId: string, taskId: string, isDone: boolean}) => {
        dispatch(updateTaskIsDoneAC(payload))
    }

    const updateTaskTitle = (payload: {tlId: string, taskId: string, title: string}) => {
        dispatch(updateTaskTitleAC(payload))
    }

    const deleteTodoList = (id: string) => {
        dispatch(deleteTodoListAC({id}))
    }

    const createTodoList = (title: string) => {
        dispatch(createTodoListAC(title))
    }

    const updateTodoListTitle = (payload: {id: string, title: string}) => {
        dispatch(updateTodoListTitleAC(payload))
    }

    const updateTodoListFilter = (payload: {id: string, filter: Filter}) => {
        dispatch(updateTodoListFilterAC(payload))
    }

    const mappedTodoLists = todoLists.map(tl => {

        const tasksForTodoList = tasks[tl.id]

        const getTasksByFilter = () => {
            switch (tl.filter) {
                case 'Active':
                    return tasksForTodoList.filter(task => !task.isDone)
                case 'Completed':
                    return tasksForTodoList.filter(task => task.isDone)
                default:
                    return tasksForTodoList
            }
        }

        let filteredTasks = getTasksByFilter()

        return (
            <Grid2 key={tl.id}>
                <Paper sx={{p: '0 20px 20px 20px'}}>
                    <TodoListItem tlId={tl.id}
                                  title={tl.title}
                                  filter={tl.filter}
                                  tasks={filteredTasks}
                                  createTask={createTask}
                                  deleteTask={deleteTask}
                                  deleteTodoList={deleteTodoList}
                                  updateTaskTitle={updateTaskTitle}
                                  updateTaskIsDone={updateTaskIsDone}
                                  updateTodoListTitle={updateTodoListTitle}
                                  updateTodoListFilter={updateTodoListFilter}
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
