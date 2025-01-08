import {Button} from "./Button.tsx";
import {FilterType} from "./TodoListItem.tsx";

type FilterBarPropsType = {
    filter: FilterType
    handleFilterChange: (filters: FilterType) => void
}

export function FilterBar({
                            filter,
                            handleFilterChange
                        }: FilterBarPropsType) {

    // Каррированная функция: создает обработчик клика, передающий filter в handleFilterChange.
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