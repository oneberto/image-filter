import { useMemo, useState } from "react";
import ChangeFilterScreen from "./screens/change-filter";
import InitialScreen from "./screens/initial";

const App = () => {
    const [image, setImage] = useState<File>();

    console.log(image);

    const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event?.target?.files?.length) {
            setImage(event.target.files[0]);
        }
    };

    const previewImageURL = useMemo(
        () =>
            ["image/jpeg", "image/png"].includes(image?.type || "")
                ? URL.createObjectURL(image!)
                : undefined,
        [image]
    );

    if (!image) {
        return <InitialScreen onChangeImage={handleChangeImage} />;
    }

    return (
        <>
            <ChangeFilterScreen
                onCancel={() => setImage(undefined)}
                previewImageURL={previewImageURL}
            />
        </>
    );
};

export default App;
