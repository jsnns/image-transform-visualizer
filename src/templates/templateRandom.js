import chroma from "chroma-js";

export function templateRandom(size) {
	let image = [];

	for (let x = 0; x < size; x++) {
		image.push([]);

		for (let y = 0; y < size; y++) {
			image[x].push(chroma.random());
		}
	}

	return image;
}
