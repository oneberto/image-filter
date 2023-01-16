import React from "react";
import ImageIcon from "../../components/icons/image";
import { useAppContext } from "../../context";
import { ContextActionType } from "../../context/types";

import "./styles.scss";

const InitialScreen = () => {
    const { dispatch } = useAppContext();

    const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files?.length) {
            return;
        }

        dispatch({
            type: ContextActionType.ChangeImage,
            payload: event.target.files[0],
        });
    };

    return (
        <div className="container">
            <h1>Image filter app</h1>

            <div className="dropzone">
                <input
                    type="file"
                    onChange={handleChangeImage}
                    accept="image/*"
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
