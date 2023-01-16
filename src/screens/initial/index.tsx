import React from "react";
import ImageIcon from "../../components/icons/image";

import "./styles.scss";

const InitialScreen = () => {
    return (
        <div className="container">
            <h1>Image filter app</h1>

            <div className="dropzone">
                <input type="file" onChange={console.log} />

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
