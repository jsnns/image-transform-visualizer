import React, {useState} from "react";
import {Box, Button, RangeInput, Text, TextInput} from "grommet";
import {templateHardEdge} from "../templates/templateHardEdge";
import {templateRandom} from "../templates/templateRandom";
import {templateRainbow} from "../templates/templateRainbow";
import {templateCheckerboard} from "../templates/templateCheckerboard";

const ImageTemplates = ({ changeImage, hasImage }) => {
    const [size, setSize] = useState(15);
    const [colors, setColors] = useState(["#000", "#F3F3F3"]);

    const set_templateHardEdge = () => changeImage(templateHardEdge(size, colors));
    const set_templateRandom = () => changeImage(templateRandom(size));
    const set_rainbowTemplate = () => changeImage(templateRainbow(size));
    const set_checkerboardTemplate = () => changeImage(templateCheckerboard(size, colors));


    if(!hasImage) {
        set_templateHardEdge();
    }

    return (
        <div>
            <Box direction="row" gap="small">
                <Button
                    label="Hard Edge"
                    onClick={set_templateHardEdge}
                    primary
                />
                <Button
                    label="Random Image"
                    onClick={set_templateRandom}
                    primary
                />
                <Button
                    label="Rainbow"
                    onClick={set_rainbowTemplate}
                    primary
                />
                <Button
                    label="Checkerboard"
                    onClick={set_checkerboardTemplate}
                    primary
                />

            </Box>
            <Box
                width="medium"
                direction="row"
                margin={{ bottom: "medium", top: "small" }}
            >
                <Text style={{ width: 75 }} margin={{ right: "small" }}>
                    Size {size}
                </Text>
                <RangeInput
                    min={0}
                    max={25}
                    value={size}
                    onChange={e => setSize(e.target.value)}
                />
                <TextInput onChange={e => setColors(e.target.value.split(', '))} value={colors.join(", ")} />
            </Box>
        </div>
    );
};

export default ImageTemplates;