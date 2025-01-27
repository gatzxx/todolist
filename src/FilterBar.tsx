import {FilterType} from "./TodoListItem.tsx";
import {Button} from "./Button.tsx";

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
        <>
            <Button className={filter === 'All' ? 'activeFilter' : ''}
                    title='All'
                    onClick={handleFilterClick('All')}
            />

            <Button className={filter === 'Active' ? 'activeFilter' : ''}
                    title='Active'
                    onClick={handleFilterClick('Active')}
            />

            <Button className={filter === 'Completed' ? 'activeFilter' : ''}
                    title='Completed'
                    onClick={handleFilterClick('Completed')}
            />
        </>
    )
}
