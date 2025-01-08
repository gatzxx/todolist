import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button.tsx";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm({
                                addItem
                            }: AddItemFormPropsType) {

    // Состояние для хранения ошибки (если заголовок пустой)
    const [error, setError] = useState<string | null>(null);

    // Состояние для хранения заголовка
    const [inputValue, setInputValue] = useState('')

    // Обрабатывает изменение значения в поле ввода заголовка
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    // Добавляет элемент, если заголовок не пустой
    const handleAddItem = () => {
        const trimmedInputValue = inputValue.trim()

        if (trimmedInputValue !== '') {
            addItem(trimmedInputValue);
            setInputValue('');
            setError(null);
        } else {
            setError("Title cannot be empty!");
            setInputValue('');
        }
    }

    // Обрабатывает добавление элемента при нажатии клавиши Enter
    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
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