import React, { useState } from "react";
import md5 from "md5";

import "../styles/Md5Id.css";
import { Button, Box, Text } from "grommet";

function MD5ID({ message, noSlice }) {
	const [savedHash, setSavedHash] = useState(null);

	let start = 24;

	if (noSlice) {
		start = 0;
	}

	const hash = md5(message);

	return (
		<div className="md5-container">
			<Box direction="row" gap="small" margin={{ top: "small" }}>
				<Text>Current Hash&nbsp;</Text>
				<span className="md5-id">{hash.toUpperCase().slice(start)}</span>
			</Box>
			{savedHash && (
				<Box direction="row" gap="small" margin={{ top: "small" }}>
					<Text>Memory Hash&nbsp;&nbsp;</Text>
					<span
						className="md5-id"
						style={{ color: savedHash === hash ? "green" : "red" }}
					>
						{savedHash.toUpperCase().slice(start)}
					</span>
				</Box>
			)}
			<Box direction={"row"} fill pad={{top: "small", bottom: "small"}}>
				<Button fill label="Memory" onClick={() => setSavedHash(hash)} />
			</Box>
		</div>
	);
}

export default MD5ID;
