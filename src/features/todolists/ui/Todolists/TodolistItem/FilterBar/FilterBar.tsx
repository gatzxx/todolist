import {updateTodoListFilterAC} from "@/features/todolists/model/actions/todoListsActions.ts";
import {Filter} from "@/features/todolists/model/types/types.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {containerSx} from "@/common/styles/container.styles.ts";
import {Box, Button} from "@mui/material";

type Props = {
    tlId: string
    filter: Filter
}

export function FilterBar(
    {
        tlId,
        filter
    }
    : Props
) {

    const dispatch = useAppDispatch()

    const updateTodoListFilter = (filter: Filter) => {
        dispatch(updateTodoListFilterAC({id: tlId, filter}))
    }

    return (
        <Box sx={containerSx}>
            <Button variant={filter === 'All' ? 'outlined' : 'text'}
                    onClick={() => updateTodoListFilter('All')}
            >
                ALL
            </Button>

            <Button variant={filter === 'Active' ? 'outlined' : 'text'}
                    onClick={() => updateTodoListFilter('Active')}
            >
                ACTIVE
            </Button>

            <Button variant={filter === 'Completed' ? 'outlined' : 'text'}
                    onClick={() => updateTodoListFilter('Completed')}
            >
                COMPLETED
            </Button>
        </Box>
    )
}
