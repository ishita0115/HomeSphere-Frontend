import React from 'react';

interface CustomButtonProps {
    label: string;
    className?: string;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    label,
    className,
    onClick,
}) => {
    return (
        <div 
            onClick={onClick}
            className={`w-full bg-[#0082cc] py-4 bg-airbnb hover:bg-airbnb-dark text-white text-center rounded-xl transition cursor-pointer ${className}`}
        >
            {label}
        </div>
    )
}

export default CustomButton;
