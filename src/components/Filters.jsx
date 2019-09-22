import {Box, Button, Heading, TextArea} from "grommet";
import * as PropTypes from "prop-types";
import React, {useState} from "react";

function Filters({kernelChoices, hasImage, applyCustomKernal, applyKernal}) {
    const [customKernal, setCustomKernal] = useState("0,0,0\n0,0,0\n0,0,0");

    return <Box direction="column" margin={{right: "small"}} gap="small">
        <Heading margin={{bottom: "small", top: "small"}}>
            Filters
        </Heading>
        {kernelChoices.map(choice => (
            <Button
                primary
                disabled={!hasImage}
                onClick={() => applyKernal(choice.kernel)}
                label={choice.name}
            />
        ))}
        <Box margin={{top: "medium"}} gap={"small"}>
            <TextArea
                value={customKernal}
                rows={3}
                onChange={e => setCustomKernal(e.target.value)}
            />
            <Button
                primary
                disabled={!hasImage}
                onClick={() => applyCustomKernal(customKernal)}
                label={"Apply Custom Kernal"}
            />
        </Box>
    </Box>;
}

Filters.propTypes = {
    callbackfn: PropTypes.func,
    state: PropTypes.any,
    onChange: PropTypes.func,
    onClick: PropTypes.func
};

export default Filters;