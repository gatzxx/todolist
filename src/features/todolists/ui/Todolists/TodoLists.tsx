import {selectTodoLists} from "@/features/todolists/model/selectors/todoListsSelectors.ts";
import {TodoListItem} from "@/features/todolists/ui/Todolists/TodolistItem/TodoListItem.tsx";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {Grid2, Paper} from "@mui/material";

export const TodoLists = () => {
    const todoLists = useAppSelector(selectTodoLists)

    const mappedTodoLists = todoLists.map(tl => {
        return (
            <Grid2 key={tl.id}>
                <Paper sx={{p: '0 20px 20px 20px'}}>
                    <TodoListItem tlId={tl.id}
                                  title={tl.title}
                                  filter={tl.filter}
                    />
                </Paper>
            </Grid2>
        )
    })

    return (
        <Grid2 container spacing={4}>
            {
                todoLists.length
                    ? <>{mappedTodoLists}</>
                    : <span>Your TodoList is empty!</span>
            }
        </Grid2>
    )
}
