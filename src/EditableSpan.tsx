import {ChangeEvent, KeyboardEvent, useState} from "react"
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    onTitleChange: (value: string) => void
}

export function EditableSpan(
    {
        title, onTitleChange
    }
    : EditableSpanPropsType
) {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')

    const handleEditMode = () => {
        setEditMode(true)
        setInputValue(title)
    }

    const handleViewMode = () => {
        setEditMode(false)
        onTitleChange(inputValue)
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleViewMode()
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    return editMode
        ? <TextField variant="outlined"
                     size={'small'}
                     onBlur={handleViewMode}
                     onChange={handleInputChange}
                     onKeyDown={handleKeyPress}
                     value={inputValue}
                     autoFocus
        />

        : <span onDoubleClick={handleEditMode}>{title}</span>
}
