import {ButtonHTMLAttributes} from "react";

type ButtonPropsType = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({title, className, onClick}: ButtonPropsType) => {

    return (
        <button onClick={onClick} className={className}>{title}</button>
    );
};