import React, {Component} from "react";
import {Box, Text, Anchor} from "grommet";

import {Image} from "./components/Image";
import {meanBlur} from "./filters/meanBlur";

import "./styles/Image.css";
import "./styles/App.css";
import ImageTemplates from "./components/ImageTemplates";
import {gaussianBlur} from "./filters/gaussianBlur";
import {sharpen} from "./filters/sharpen";
import {rotateImage, shuffleRows, swirl} from "./filters/swirl";
import {applyKernal} from "./filters/applyKernal";
import {templateHardEdge} from "./templates/templateHardEdge";
import {templateCheckerboard} from "./templates/templateCheckerboard";
import {templateRainbow} from "./templates/templateRainbow";
import {templateRandom} from "./templates/templateRandom";
import {templateApple} from "./templates/templateApple";
import MD5ID from "./components/MD5ID";
import Filters from "./components/Filters";
import {invert} from "./filters/invert";

const kernalChoices = [
    {name: "Mean Blur", kernal: meanBlur},
    {name: "Gaussian Blur", kernal: gaussianBlur},
    {name: "Sharpen", kernal: sharpen},
    {name: "Randomize", kernal: swirl},
    {name: "Flip", kernal: rotateImage},
    {name: "Shuffle Rows", kernal: shuffleRows},
    {name: "Invert", kernal: invert}
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
        selectedKernal: kernalChoices[0],
        customKernal: ""
    };

    render() {
        let pixelSize = 0;

        const {state} = this;

        if (state.image) {
            pixelSize = Math.floor(85 / state.image.length);
        }

        return (
            <Box width={"100vw"} height={"100vh"} direction="row" background={"dark-1"}>
                <ImageTemplates
                    changeImage={this.updateImage}
                    hasImage={Boolean(state.image)}
                    imageTemplates={imageTemplates}
                />

                <Box flex={"grow"} align={"center"} justify={"center"} height={"100%"}>
                    <Image pixelSize={`${pixelSize}vh`} image={state.image}/>
                    <MD5ID message={JSON.stringify(state.image)}/>
                </Box>

                <Filters
                    hasImage={Boolean(state.image)}
                    applyCustomKernal={this.applyCustomKernal}
                    applyKernal={this.applyKernal}
                    kernalChoices={kernalChoices}
                />

                <Text style={{position: "absolute", bottom: 10, right: 10}}>
					<Anchor target={"new"} href={"https://workbyjacob.com"}>Jacob Sansbury</Anchor> 2019
				</Text>
            </Box>
        );
    }

    applyCustomKernal = kernal => {
        kernal = kernal.split("\n").map(row => row.split(",").map(unit => Number(unit.trim())));
        let image = applyKernal(this.state.image, kernal);

        return this.setState({image});
    };

    updateImage = image => {
        this.setState({image, previousImage: null});
    };

    applyKernal = kernal => {
        const previousImage = this.state.image;
        this.setState({
            image: kernal(this.state.image),
            previousImage
        });
    };
}

export default App;
