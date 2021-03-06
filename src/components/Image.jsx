import Radium from "radium";
import React from "react";

const styles = {
    fadeIn: (delay, previousColor, color) => ({
        animation: 'x 0.5s',
        animationDelay: `${delay}s`,
        animationFillMode: "both",
        animationName: Radium.keyframes({
            "0%": {backgroundColor: previousColor},
            "100%": {backgroundColor: color}
        }, "in")
    })
};

export let Image = ({image, pixelSize, previousImage}) => {
    if (!image) return <div/>;

    return (
        <div className="image">
            <div className="inner-image">
                {/* create image of rows */}
                {image.map((row, x) => (
                    
                    // create rows of pixels
                    <div className="row" style={{height: pixelSize}} key={`row-${x}`}>
                        {row.flatMap((pixel, y) => {

                            let previousColor;

                            try {
                                previousColor = previousImage[x][y];
                            } catch {
                                previousColor = "#333";
                            }

                            return <div
                                className="pixel"
                                key={`pixel-${x}-${y}`}
                                style={{
                                    ...styles.fadeIn(((x*image.length)+y)*(1/image.length**2), previousColor, pixel),
                                    backgroundColor: previousColor,
                                    height: pixelSize,
                                    width: pixelSize
                                }}
                            />;
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

Image = Radium(Image);
