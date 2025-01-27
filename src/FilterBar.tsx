import {containerSx} from "./TodolistItem.styles.ts";
import {FilterType} from "./TodoListItem.tsx";
import {Box, Button} from "@mui/material";

type FilterBarPropsType = {
    filter: FilterType
    handleFilterChange: (filters: FilterType) => void
}

export function FilterBar(
    {
        filter,
        handleFilterChange
    }
    : FilterBarPropsType
) {

    const handleFilterClick = (filter: FilterType) => () => handleFilterChange(filter)

    return (
        <Box sx={containerSx}>
            <Button variant={filter === 'All' ? 'outlined' : 'text'}
                    onClick={handleFilterClick('All')}
            >
                ALL
            </Button>

            <Button variant={filter === 'Active' ? 'outlined' : 'text'}
                    onClick={handleFilterClick('Active')}
            >
                ACTIVE
            </Button>

            <Button variant={filter === 'Completed' ? 'outlined' : 'text'}
                    onClick={handleFilterClick('Completed')}
            >
                COMPLETED
            </Button>
        </Box>
    )
}
