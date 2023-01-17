import React from "react";
import ImageIcon from "../../components/icons/image";

import "./styles.scss";

type Props = {
    onChangeImage(event: React.ChangeEvent<HTMLInputElement>): void;
};

const InitialScreen = ({ onChangeImage }: Props) => {
    return (
        <div className="container" data-testid="initial-screen">
            <h1>Image filter app</h1>

            <div className="dropzone" data-testid="dropzone">
                <input
                    type="file"
                    onChange={onChangeImage}
                    accept="image/*"
                    data-testid="dropzone-input"
                />

                <ImageIcon className="icon" />

                <span className="desktop-message">
                    Drag an image here or click to select
                </span>
                <span className="mobile-message">
                    Click here to select an image
                </span>
            </div>
        </div>
    );
};

export default InitialScreen;
