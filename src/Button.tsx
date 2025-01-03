type ButtonPropsType = {
    title: string,
    onClick?: () => void,
    className?: string,
};

export const Button = ({title, onClick, className}: ButtonPropsType) => {

    const handleButtonClick = () => {
        if (onClick) {
            onClick();
        }
    }

    return (
        <button onClick={onClick ? handleButtonClick : undefined} className={className}>{title}</button>
    );
};