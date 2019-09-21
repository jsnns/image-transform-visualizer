export function templateHardEdge(size, colors) {
	const midPoint = Math.floor(size / 2);

	const image = [];

	for (let x = 0; x < size; x++) {
		image.push([]);
		for (let y = 0; y < size; y++) {
			if (y < midPoint) {
				image[x].push(colors[0]);
			} else {
				image[x].push(colors[1]);
			}
		}
	}

	return image;
}
