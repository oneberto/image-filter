import React from "react";

type Colors = "transparent" | "white" | "blue";

type Props = {
    children: React.ReactNode;
    background?: Colors;
    color?: Colors;
};

const Button = ({
    children,
    background = "transparent",
    color = "white",
}: Props) => {
    return <button className="button">{children}</button>;
};

export default Button;
