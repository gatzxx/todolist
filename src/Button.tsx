type ButtonPropsType = {
    title: string,
    onClick?: () => void,
};

export const Button = ({title, onClick}: ButtonPropsType) => {

    const handleButtonClick = () => {
        if (onClick) {
            onClick();
        }
    }

    return (
        <button onClick={onClick ? handleButtonClick : undefined}>{title}</button>
    );
};