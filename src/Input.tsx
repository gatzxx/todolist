import {InputHTMLAttributes} from "react";

type InputPropsType = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({onChange, onKeyDown, type}: InputPropsType) => {

    return (
        <input onChange={onChange} onKeyDown={onKeyDown} type={type}/>
    );
};