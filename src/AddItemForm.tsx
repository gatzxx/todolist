import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button.tsx";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(
    {
        addItem
    }
    : AddItemFormPropsType
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
        <>
            <input className={error ? 'error' : ''}
                   value={inputValue}
                   onChange={handleInputChange}
                   onKeyDown={handleKeyPress}
            />

            <Button onClick={handleAddItem}
                    title='+'
            />

            {error && <div className={'errorMessage'}>{error}</div>}
        </>
    )
}
