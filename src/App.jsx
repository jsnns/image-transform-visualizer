import { Anchor, Box, Grommet, grommet, Text } from "grommet";
import React, { Component } from "react";
import Filters from "./components/Filters";
import { Image } from "./components/Image";
import ImageTemplates from "./components/ImageTemplates";
import MD5ID from "./components/MD5ID";
import { applyKernal } from "./filters/applyKernal";
import { gaussianBlur } from "./filters/gaussianBlur";
import { invert } from "./filters/invert";
import { meanBlur } from "./filters/meanBlur";
import { randomize, rotateImage, shuffleRows } from "./filters/randomize";
import { sharpen } from "./filters/sharpen";
import "./styles/App.css";
import "./styles/Image.css";
import { templateApple } from "./templates/templateApple";
import { templateCheckerboard } from "./templates/templateCheckerboard";
import { templateHardEdge } from "./templates/templateHardEdge";
import { templateRainbow } from "./templates/templateRainbow";
import { templateRandom } from "./templates/templateRandom";



const kernelChoices = [
  { name: "Mean Blur", kernel: meanBlur },
  { name: "Gaussian Blur", kernel: gaussianBlur },
  { name: "Sharpen", kernel: sharpen },
  { name: "Randomize", kernel: randomize },
  { name: "Flip", kernel: rotateImage },
  { name: "Shuffle Rows", kernel: shuffleRows },
  { name: "Invert", kernel: invert }
];

const imageTemplates = [
  { name: "Hard Edge", f: templateHardEdge },
  { name: "Checkerboard", f: templateCheckerboard },
  { name: "Rainbow", f: templateRainbow },
  { name: "Random", f: templateRandom },
  { name: "Apple", f: templateApple }
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

    const { state } = this;

    if (state.image) {
      if (window.innerHeight > window.innerWidth) {
        pixelSize = Math.floor((window.innerWidth * 0.8) / state.image.length);
        pixelSize = `${pixelSize}px`;
      }
      if (window.innerHeight <= window.innerWidth) {
        pixelSize = Math.floor(50 / state.image.length);
        pixelSize = `${pixelSize}vw`;
      }
    }

    const isMobile = window.innerHeight > window.innerWidth;

    return (
      <Grommet
        theme={{
          ...grommet,
          global: {
            colors: {
              "dark-1": "#1C1C1D",
              white: "#1C1C1D",
              "accent-1": "#9b59b6"
            }
          }
        }}
      >
        <Box
          width={"100vw"}
          minHeight={"100vh"}
          direction="row-responsive"
          background={"dark-1"}
        >
          <Box>
            <ImageTemplates
              changeImage={this.updateImage}
              hasImage={Boolean(state.image)}
              imageTemplates={imageTemplates}
            />
          </Box>

          <Box flex={"grow"} align={"center"} justify={"center"} pad={"large"}>
            <Image
              pixelSize={pixelSize}
              image={state.image}
              previousImage={state.previousImage}
            />
            {!isMobile && <MD5ID message={JSON.stringify(state.image)} />}
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
            <Text style={{ position: "fixed", bottom: 10, right: 10 }}>
              <Anchor target={"new"} href={"https://workbyjacob.com"}>
                Jacob Sansbury
              </Anchor>{" "}
              2019
            </Text>
          )}
        </Box>
      </Grommet>
    );
  }

  applyCustomKernal = kernel => {
    kernel = kernel
      .split("\n")
      .map(row => row.split(",").map(unit => Number(unit.trim())));
    let image = applyKernal(this.state.image, kernel);

    return this.setState({ image });
  };

  updateImage = image => {
    const previousImage = this.state.image;

    this.setState({ image, previousImage });
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
