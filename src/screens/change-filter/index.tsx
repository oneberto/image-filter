import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "../../components/button";
import { fabric } from "fabric";
import "./styles.scss";

var filters = ["Vintage", "Sepia", "Blur"];

type Props = {
    previewImageURL?: string;
    onCancel(): void;
};

const ChangeFilterScreen = ({ previewImageURL, onCancel }: Props) => {
    const [filterName, setFilterName] = useState<string>();
    const [filterStrength, setFilterStrength] = useState(50);

    const fabricRef = useRef<fabric.Canvas>();
    const canvasRef = useRef<any>(null);

    const initCanvas = useCallback(
        (options?: { width?: number; height?: number }) => {
            const size = window?.screen?.width >= 500 ? 500 : 300;

            fabricRef.current = new fabric.Canvas(canvasRef.current, {
                width: size,
                height: size,
                selection: false,
                imageSmoothingEnabled: true,
                ...options,
            });
        },
        []
    );

    useEffect(() => {
        initCanvas();

        return () => {
            fabricRef.current?.dispose();
        };
    }, [initCanvas]);

    const addImage = useCallback(
        (options?: { filterStrength?: number; filterName?: string }) => {
            const { filterStrength, filterName } = options || {};

            // Restart canvas when there's a filter
            // TODO: Do I really need to restart the entire canvas?
            if (filterName) {
                fabricRef.current?.dispose();

                initCanvas();
            }

            // Insert the image whithout any filters
            fabric.Image.fromURL(previewImageURL!, (event) => {
                const image = event
                    .set({
                        left: 0,
                        top: 0,
                    })
                    .scale(1);

                fabricRef.current?.centerObject(image);

                fabricRef.current?.add(image);
            });

            // Set an image with the selected filter.
            // Controls the intensity with the opacity prop.
            if (filterName) {
                const isBlur = filterName === "Blur";

                fabric.Image.fromURL(previewImageURL!, (event) => {
                    const image = event
                        .set({
                            left: 0,
                            top: 0,
                            opacity: (filterStrength || 0) / 100, // the filter intensity goes here
                        })
                        .scale(1);

                    fabricRef.current?.centerObject(image);

                    var filter = new (fabric.Image.filters as any)[
                        filterName as any
                    ]({
                        ...(isBlur && {
                            // setting blur as 100 by default
                            // we don't have any visual changes without that
                            blur: 50,
                        }),
                    });

                    event.filters = [filter];
                    event.applyFilters();

                    fabricRef.current?.add(image);
                });
            }
        },
        [previewImageURL, initCanvas]
    );

    const imageWasSet = useRef(false);

    useEffect(() => {
        // This will prevent react to add the image twice
        // TODO: this could be caused by a wrong implementation, we need to check
        if (imageWasSet.current) {
            return;
        }

        imageWasSet.current = true;

        addImage();
    }, [addImage]);

    useEffect(() => {
        if (filterName || filterStrength) {
            addImage({
                filterName,
                filterStrength,
            });
        }
    }, [filterName, filterStrength, addImage]);

    const onChangeFilterStrength = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFilterStrength(~~event?.target?.value);
    };

    const onChangeFilter = (name: string) => {
        setFilterName((currentName) =>
            currentName === name ? undefined : name
        );

        setFilterStrength(50);
    };

    const handleClickDownload = () => {
        try {
            // this anchor is present in the index.html file because
            // some browsers block the download when the anchor is created virtually
            const anchor = document.getElementById(
                "download-link"
            ) as HTMLAnchorElement;

            if (!anchor) {
                return;
            }

            anchor.download = "image.png";
            anchor.href = canvasRef.current?.toDataURL("image/png");
            anchor.click();
        } catch (error) {
            console.log(error);
            window.alert("Sorry, we had a problem. Try again.");
        }
    };

    return (
        <div className="container" data-testid="change-filter">
            <h1>Select the filter you want to apply</h1>

            <div className="filters">
                {filters.map((name) => (
                    <Button
                        key={name}
                        background="transparent"
                        color="white"
                        border="1px solid rgba(255,255,255,0.4)"
                        onClick={() => onChangeFilter(name)}
                        {...(name === filterName && {
                            color: "black",
                            background: "white",
                        })}
                    >
                        {name}
                    </Button>
                ))}
            </div>

            <div
                className="filter-range"
                style={{ opacity: filterName ? 1 : 0 }}
            >
                <input
                    type="range"
                    id="strength"
                    name="strength"
                    min="0"
                    max="100"
                    step={10}
                    onChange={onChangeFilterStrength}
                    value={filterStrength}
                />
                <label htmlFor="strength">Strength {filterStrength}%</label>
            </div>

            <canvas className="image" ref={canvasRef} />

            <div className="footer">
                <Button onClick={onCancel}>Cancel</Button>
                <Button
                    background="white"
                    color="black"
                    onClick={handleClickDownload}
                >
                    Download
                </Button>
            </div>
        </div>
    );
};

export default ChangeFilterScreen;
