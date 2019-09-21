import React, { Component, useState } from "react";
import { Button, Select, Text, Box, RangeInput } from "grommet";

import { Image } from "./components/Image";
import {meanBlur} from "./filters/meanBlur";

import "./styles/Image.css";
import "./styles/App.css";
import ImageTemplates from "./components/ImageTemplates";
import {gaussianBlur} from "./filters/gaussianBlur";
import {sharpen} from "./filters/sharpen";

const kernalChoices = [
	{ name: "Mean Blur", kernal: meanBlur },
	{ name: "Gaussian Blur", kernal: gaussianBlur},
	{ name: "Sharpen", kernal: sharpen}
];

class App extends Component {
	state = {
		image: null,
		filteredImage: null,
		selectedKernal: kernalChoices[0]
	};

	render() {
		return (
			<Box width={"100vw"} pad="small" direction="column">
				<ImageTemplates changeImage={this.updateImage} hasImage={Boolean(this.state.image)} />

				<Box direction="row">
					<Image pixelSize={35} image={this.state.image} />
					<Box direction="column" margin="small">
						<Select
							options={kernalChoices}
							labelKey="name"
							value={this.state.selectedKernal}
							onChange={({ option }) =>
								this.setState({ selectedKernal: option })
							}
						/>
						<Button
							brand
							disabled={!this.state.selectedKernal || !this.state.image}
							margin="small"
							onClick={this.applyKernal}
							label={"=>"}
						/>
						<Button
							brand
							disabled={!this.state.filteredImage}
							margin="small"
							onClick={this.swapImages}
							label={"<="}
						/>
					</Box>
					<Image pixelSize={35} image={this.state.filteredImage} />
				</Box>
			</Box>
		);
	}

	updateImage = image => {
		this.setState({ image, filteredImage: null })
	};

	swapImages = () => {
		this.setState({ image: this.state.filteredImage, filteredImage: null });
	};

	applyKernal = () => {
		this.setState({
			filteredImage: this.state.selectedKernal.kernal(this.state.image)
		});
	};
}

export default App;
