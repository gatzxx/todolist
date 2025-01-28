import {containerSx} from "./TodolistItem.styles.ts";
import {Filter} from "./TodoListItem.tsx";
import {Box, Button} from "@mui/material";

type Props = {
    filter: Filter
    handleToggleFilter: (filters: Filter) => void
}

export function FilterBar(
    {
        filter,
        handleToggleFilter
    }
    : Props
) {

    const handleSelectFilter = (filter: Filter) => () => handleToggleFilter(filter)

    return (
        <Box sx={containerSx}>
            <Button variant={filter === 'All' ? 'outlined' : 'text'}
                    onClick={handleSelectFilter('All')}
            >
                ALL
            </Button>

            <Button variant={filter === 'Active' ? 'outlined' : 'text'}
                    onClick={handleSelectFilter('Active')}
            >
                ACTIVE
            </Button>

            <Button variant={filter === 'Completed' ? 'outlined' : 'text'}
                    onClick={handleSelectFilter('Completed')}
            >
                COMPLETED
            </Button>
        </Box>
    )
}
