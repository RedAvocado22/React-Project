import React from "react";
import styled from "styled-components";

const LabelStyles = styled.label`
    color: ${(props) => props.theme.grayDark};
    font-weight: 600;
    cursor: pointer;
`;

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    htmlFor?: string;
    children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ htmlFor = "", children, ...props }) => {
    return (
        <LabelStyles htmlFor={htmlFor} {...props}>
            {children}
        </LabelStyles>
    );
};

export default Label;
