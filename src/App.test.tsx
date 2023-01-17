import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import Button from "./components/button";
import user from "@testing-library/user-event";

test("renders InitialScreen initially", () => {
    render(<App />);
    const linkElement = screen.getByTestId("initial-screen");
    expect(linkElement).toBeInTheDocument();

    const dropzoneElement = screen.getByTestId("dropzone");
    expect(dropzoneElement).toBeInTheDocument();
});

test("renders ChangeFilterScreen after selecting a Image", () => {
    // Mock the URL API (to not cause jest errors)
    URL.createObjectURL = jest.fn();

    render(<App />);

    // Create a fake image
    const file = new File(["hello"], "hello.png", { type: "image/png" });

    const input = screen.getByTestId("dropzone-input");

    // Adds the mocked file to the file input
    user.upload(input, file);

    // ChangeFilterScreen is supposed to render after selecting a file
    const dropzoneElement = screen.getByTestId("change-filter");
    expect(dropzoneElement).toBeInTheDocument();
});

test("button calls correctly the callback", () => {
    const cb = jest.fn(() => {});

    render(
        <Button testid="button" onClick={cb}>
            Test
        </Button>
    );

    const linkElement = screen.getByTestId("button");

    linkElement.click();

    expect(cb).toHaveBeenCalled();
});
