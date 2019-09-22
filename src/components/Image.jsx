import React from "react";
import Radium from "radium";
import {fadeIn} from "react-animations";
import md5 from "md5";

const styles = {
    fadeIn: {
        animation: 'x 0.7s',
        animationFillMode: "forwards",
        animationName: Radium.keyframes(fadeIn, "in")
    }
};

export let Image = ({image, pixelSize}) => {
    if (!image) return <div/>;

    return (
        <div className="image">
            <div className="inner-image">
                {/* create image of rows */}
                {image.map((row, x) => (
                    // create rows of pixels

                    <div className="row" style={{height: pixelSize}} key={`row-${x}`}>
                        {row.flatMap((pixel, y) => {
                            return <div
                                className="pixel"
                                key={`pixel-${x}-${y}`}
                                style={{
                                    ...styles.fadeIn,
                                    backgroundColor: pixel,
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
