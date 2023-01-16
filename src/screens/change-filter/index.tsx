import React from "react";
import { useAppContext } from "../../context";
import "./styles.scss";

const ChangeFilterScreen = () => {
    const { state } = useAppContext();

    return (
        <div className="container">
            <h1>Select the filter you want to apply</h1>

            <div
                className="image"
                style={{ backgroundImage: `url(${state?.previewImageURL})` }}
            ></div>
        </div>
    );
};

export default ChangeFilterScreen;
