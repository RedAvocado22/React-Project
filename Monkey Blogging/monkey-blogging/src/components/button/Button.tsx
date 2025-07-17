import React from "react";
import styled from "styled-components";
import LoadingSpinner from "../loading/LoadingSpinner";

interface ButtonStyleProps {
    height?: string;
}

const ButtonStyles = styled.button<ButtonStyleProps>`
    cursor: pointer;
    padding: 0 20px;
    line-height: 1;
    color: white;
    border-radius: 8px;
    font-weight: 600;
    font-size: 18px;
    width: 100%;
    height: ${(props) => props.height || "60px"};
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
    );
    &:disabled {
        opacity: 0.5;
        pointer-events: none;
    }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    type?: "button" | "submit" | "reset" | undefined;
    onClick?: () => void;
    children?: React.ReactNode;
    isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    type = "button",
    onClick = () => {},
    children,
    isLoading,
    ...props
}) => {
    const child = isLoading ? <LoadingSpinner></LoadingSpinner> : children;
    return (
        <ButtonStyles type={type} onClick={onClick} {...props}>
            {child}
        </ButtonStyles>
    );
};

export default Button;
