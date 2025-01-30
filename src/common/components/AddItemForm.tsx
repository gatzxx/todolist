import {ChangeEvent, KeyboardEvent, useState} from "react"
import {IconButton, TextField} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

type Props = {
    addItem: (title: string) => void
}

export function AddItemForm(
    {
        addItem
    }
    : Props
) {

    const [error, setError] = useState<string | null>(null)

    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)

    const handleAddItem = () => {
        const trimmedInputValue = inputValue.trim()

        if (trimmedInputValue !== '') {
            addItem(trimmedInputValue)
            setInputValue('')
            setError(null)
        } else {
            setError("Title cannot be empty!")
            setInputValue('')
        }
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            handleAddItem()
        }
    }

    return (
        <div>
            <TextField label={'Enter a title'}
                       variant={'outlined'}
                       size={'small'}
                       className={error ? 'error' : ''}
                       value={inputValue}
                       onChange={handleInputChange}
                       onKeyDown={handleKeyPress}
            />

            <IconButton color={'primary'}
                        onClick={handleAddItem}
            >
                <AddIcon/>
            </IconButton>

            {error && <div className={'errorMessage'}>{error}</div>}
        </div>
    )
}
