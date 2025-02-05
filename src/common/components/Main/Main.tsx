import {createTodoListAC} from "@/features/todolists/model/actions/todoListsActions.ts";
import {TodoLists} from "@/features/todolists/ui/Todolists/TodoLists.tsx";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {AddItemForm} from "../AddItemForm/AddItemForm.tsx";
import {Container, Grid2} from "@mui/material";

export const Main = () => {
    const dispatch = useAppDispatch()

    const createTodoList = (title: string) => {
        dispatch(createTodoListAC(title))
    }

    return (
        <Container maxWidth={'lg'}>
            <Grid2 container sx={{mb: '30px'}}>
                <AddItemForm addItem={createTodoList}/>
            </Grid2>

            <Grid2 container spacing={4}>
                <TodoLists/>
            </Grid2>
        </Container>
    )
}
