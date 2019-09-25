import React, {Component} from "react";
import {Anchor, Box, Text} from "grommet";

import {Image} from "./components/Image";
import {meanBlur} from "./filters/meanBlur";

import "./styles/Image.css";
import "./styles/App.css";
import ImageTemplates from "./components/ImageTemplates";
import {gaussianBlur} from "./filters/gaussianBlur";
import {sharpen} from "./filters/sharpen";
import {rotateImage, shuffleRows, randomize} from "./filters/randomize";
import {applyKernal} from "./filters/applyKernal";
import {templateHardEdge} from "./templates/templateHardEdge";
import {templateCheckerboard} from "./templates/templateCheckerboard";
import {templateRainbow} from "./templates/templateRainbow";
import {templateRandom} from "./templates/templateRandom";
import {templateApple} from "./templates/templateApple";
import MD5ID from "./components/MD5ID";
import Filters from "./components/Filters";
import {invert} from "./filters/invert";

const kernelChoices = [
    {name: "Mean Blur", kernel: meanBlur},
    {name: "Gaussian Blur", kernel: gaussianBlur},
    {name: "Sharpen", kernel: sharpen},
    {name: "Randomize", kernel: randomize},
    {name: "Flip", kernel: rotateImage},
    {name: "Shuffle Rows", kernel: shuffleRows},
    {name: "Invert", kernel: invert}
];

const imageTemplates = [
    {name: "Hard Edge", f: templateHardEdge},
    {name: "Checkerboard", f: templateCheckerboard},
    {name: "Rainbow", f: templateRainbow},
    {name: "Random", f: templateRandom},
    {name: "Apple", f: templateApple},
];

class App extends Component {
    state = {
        image: null,
        oldImage: null,
        previousImage: null,
        selectedKernal: kernelChoices[0],
        customKernal: ""
    };

    render() {
        let pixelSize = 0;

        const {state} = this;

        if (state.image) {
            if (window.innerHeight > window.innerWidth) {
                pixelSize = Math.floor((window.innerWidth*.8) / state.image.length);
                pixelSize = `${pixelSize}px`;
            }
            if (window.innerHeight <= window.innerWidth) {
                pixelSize = Math.floor(50 / state.image.length);
                pixelSize = `${pixelSize}vw`;
            }
        }

        const isMobile = window.innerHeight > window.innerWidth;

        return (
            <Box width={"100vw"} minHeight={"100vh"} direction="row-responsive" background={"dark-1"}>
                <Box>
                    <ImageTemplates
                        changeImage={this.updateImage}
                        hasImage={Boolean(state.image)}
                        imageTemplates={imageTemplates}
                    />
                </Box>

                <Box flex={"grow"} align={"center"} justify={"center"} pad={"large"}>
                    <Image pixelSize={pixelSize} image={state.image} previousImage={state.previousImage}/>
                    {!isMobile && (
                        <MD5ID message={JSON.stringify(state.image)}/>
                    )}
                </Box>

                <Box margin={"none"} pad={"small"}>
                    <Filters
                        hasImage={Boolean(state.image)}
                        applyCustomKernal={this.applyCustomKernal}
                        applyKernal={this.applyKernal}
                        kernelChoices={kernelChoices}
                    />
                </Box>

                {!isMobile && (
                    <Text style={{position: "fixed", bottom: 10, right: 10}}>
                        <Anchor target={"new"} href={"https://workbyjacob.com"}>Jacob Sansbury</Anchor> 2019
                    </Text>
                )}
            </Box>
        );
    }

    applyCustomKernal = kernel => {
        kernel = kernel.split("\n").map(row => row.split(",").map(unit => Number(unit.trim())));
        let image = applyKernal(this.state.image, kernel);

        return this.setState({image});
    };

    updateImage = image => {
        const previousImage = this.state.image;

        this.setState({image, previousImage});
    };

    applyKernal = kernel => {
        const previousImage = this.state.image;

        this.setState({
            image: kernel(this.state.image),
            previousImage
        });
    };
}

export default App;
