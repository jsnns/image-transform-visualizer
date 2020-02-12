import React, { useState } from "react";
import { Box, Button, Heading, RangeInput, Text, TextInput } from "grommet";
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

  const isMobile = window.innerHeight > window.innerWidth;

  return (
    <Box direction="column" margin={"none"} pad={"small"}>
      <Box>
        <Heading margin={{ top: "small", bottom: "medium" }}>Images</Heading>
      </Box>
      <Box>
        <TextInput
          onChange={e => setColors(e.target.value.split(", "))}
          value={colors.join(", ")}
        />
      </Box>
      <Box direction={"row-responsive"} pad={{ top: "small" }}>
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
      <Box margin={{ bottom: "medium", top: "small" }} direction={"row"} wrap>
        {imageTemplates.map(template => {
          return (
            <Box
              basis={isMobile ? "1/2" : "auto"}
              fill={!isMobile}
              margin={"none"}
              pad={isMobile ? "small" : { bottom: "small" }}
            >
              <Button
                label={template.name}
                onClick={() => update(template.f(size, colors))}
              />
            </Box>
          );
        })}
      </Box>
      {!isMobile && (
        <Box
          align={"center"}
          style={{ position: "fixed", bottom: 10, left: 10 }}
        >
          <Image pixelSize={4} image={image} />
          <Text margin={{ top: "small" }}>Original</Text>
        </Box>
      )}
    </Box>
  );
};

export default ImageTemplates;
