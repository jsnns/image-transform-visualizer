import React, { useState } from "react";
import { Box, Button, RangeInput, Text, TextInput, Heading } from "grommet";
import { templateHardEdge } from "../templates/templateHardEdge";
import { Image } from "./Image";

const ImageTemplates = ({ changeImage, hasImage, imageTemplates }) => {
	const [size, setSize] = useState(15);
	const [colors, setColors] = useState(["#000", "#F3F3F3"]);
	const [image, setImage] = useState(templateHardEdge(size, colors));

	const update = image => {
		changeImage(image);
		setImage(image);
	};

	if (!hasImage) {
		changeImage(image);
	}

	return (
		<Box direction="column" margin={"none"} pad={"small"}>
			<Box
				align={"center"}
				style={{ position: "absolute", bottom: 10, left: 10 }}
			>
				<Image pixelSize={4} image={image} />
				<Text margin={{ top: "small" }}>Original</Text>
			</Box>

			<Box direction="column">
				<Box direction="column" gap="small">
					<Heading margin={{ top: "small", bottom: "small" }}>
						Image Options
					</Heading>
					<Box>
						<TextInput
							onChange={e => setColors(e.target.value.split(", "))}
							value={colors.join(", ")}
						/>
					</Box>
					<Box direction={"row"} pad={{ top: "small" }}>
						<Text style={{ width: 100 }} margin={{ right: "small" }}>
							Size {size}
						</Text>
						<RangeInput
							min={0}
							max={25}
							value={size}
							onChange={e => setSize(e.target.value)}
						/>
					</Box>
				</Box>
				<Box gap="small" margin={{ bottom: "medium", top: "small" }}>
					{imageTemplates.map(template => {
						return <Button label={template.name} onClick={() => update(template.f(size, colors))} />
					})}
				</Box>
			</Box>
		</Box>
	);
};

export default ImageTemplates;
