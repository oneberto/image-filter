import React from "react";
import "./styles.scss";

type Colors = "transparent" | "white" | "blue" | "black";

type Props = {
    children: React.ReactNode;
    background?: string;
    color?: Colors;
    type?: "button" | "submit";
    onClick?(): void;
    border?: string;
    testid?: string;
};

const Button = ({
    children,
    background = "transparent",
    color = "white",
    type = "button",
    border,
    testid,
    ...rest
}: Props) => {
    return (
        <button
            className="button"
            style={{
                color,
                background,
                border,
            }}
            type={type}
            {...(testid && { "data-testid": testid })}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
