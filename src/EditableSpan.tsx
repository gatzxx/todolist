import {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onTitleChange: (value: string) => void
}

export function EditableSpan({title, onTitleChange}: EditableSpanPropsType) {

    // Состояние для управления режимом редактирования (true — редактирование, false — просмотр)
    const [editMode, setEditMode] = useState<boolean>(false)

    // Состояние для хранения текущего значения поля ввода в режиме редактирования
    const [inputValue, setInputValue] = useState<string>('')

    // Активирует режим редактирования
    const handleEditMode = () => {
        setEditMode(true)
        setInputValue(title)
    }

    // Деактивирует режим редактирования и сохраняет изменения
    const handleViewMode = () => {
        setEditMode(false)
        onTitleChange(inputValue)
    }

    // Обрабатывает нажатие клавиши Enter в режиме редактирования
    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleViewMode()
        }
    }

    // Обрабатывает изменения значения в поле ввода
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    return editMode
        ? <input onBlur={handleViewMode} onChange={handleInputChange} onKeyDown={handleKeyPress} value={inputValue} autoFocus/>
        : <span onDoubleClick={handleEditMode}>{title}</span>
}