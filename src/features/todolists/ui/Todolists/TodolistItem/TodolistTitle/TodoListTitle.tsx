import {deleteTodoListAC, updateTodoListTitleAC} from "@/features/todolists/model/actions/todoListsActions.ts";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from './TodolistTitle.module.css'
import {IconButton} from "@mui/material";

type Props = {
    tlId: string
    title: string
}

export const TodoListTitle = (
    {
        tlId,
        title
    }
    : Props
) => {

    const dispatch = useAppDispatch()

    const updateTodoListTitle = (title: string) => {
        dispatch(updateTodoListTitleAC({id: tlId, title}))
    }

    const deleteTodoList = () => {
        dispatch(deleteTodoListAC({id: tlId}))
    }

    return (
        <div className={styles.container}>
            <EditableSpan title={title}
                          onTitleChange={updateTodoListTitle}
            />

            <IconButton>
                <DeleteIcon onClick={deleteTodoList}/>
            </IconButton>
        </div>
    )
}