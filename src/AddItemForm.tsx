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
    const [titleValue, setTitleValue] = useState('')

    // Обрабатывает изменение значения в поле ввода заголовка
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.currentTarget.value)
    }

    // Добавляет элемент, если заголовок не пустой
    const handleAddItem = () => {
        const trimmedTitleValue = titleValue.trim()

        if (trimmedTitleValue !== '') {
            addItem(trimmedTitleValue);
            setTitleValue('');
            setError(null);
        } else {
            setError("Title cannot be empty!");
            setTitleValue('');
        }
    }

    // Обрабатывает добавление элемента при нажатии клавиши Enter
    const handleAddItemOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            handleAddItem()
        }
    }

    return (
        <>
            <input className={error ? 'error' : ''}
                   value={titleValue}
                   onChange={handleInputChange}
                   onKeyDown={handleAddItemOnEnter}
            />
            <Button onClick={handleAddItem}
                    title='+'
            />
            {error && <div className={'errorMessage'}>{error}</div>}
        </>
    )
}