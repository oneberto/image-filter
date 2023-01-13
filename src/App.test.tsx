import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Filter app text", () => {
    render(<App />);
    const linkElement = screen.getByText(/Filter app/i);
    expect(linkElement).toBeInTheDocument();
});
