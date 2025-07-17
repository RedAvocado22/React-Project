import React from "react";
import { Control, Field, useController } from "react-hook-form";
import styled from "styled-components";

interface InputStylesProps {
    $hasIcon: boolean;
}

const InputStyles = styled.div<InputStylesProps>`
    position: relative;
    width: 100%;
    input {
        width: 100%;
        padding: ${(props) =>
            props.$hasIcon ? "16px 60px 16px 20px" : "16px 20px"};
        background-color: transparent;
        border: 1px solid ${(props) => props.theme.grayf1};
        border-radius: 8px;
        transition: all 0.2s linear;
        color: ${(props) => props.theme.black};
        font-size: 14px;
    }
    input:focus {
        border-color: ${(props) => props.theme.primary};
    }

    input::-webkit-input-placeholder {
        color: #b2b3bd;
    }
    input::-moz-input-placeholder {
        color: #b2b3bd;
    }
    .input-icon {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name?: string;
    type?: string;
    children?: React.ReactNode;
    control: Control<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const Input: React.FC<InputProps> = ({
    name = "",
    type = "text",
    children,
    control,
    ...props
}) => {
    const { field } = useController({
        control,
        name,
        defaultValue: "",
    });
    return (
        <InputStyles $hasIcon={children ? true : false}>
            <input id={name} type={type} {...field} {...props} />
            {children ? <div className="input-icon">{children}</div> : null}
        </InputStyles>
    );
};

export default Input;
