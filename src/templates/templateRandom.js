import { random } from "chroma-js";

export function templateRandom(size) {
	const midPoint = Math.floor(size / 2);

	const image = [];

	for (let x = 0; x < size; x++) {
		image.push([]);
		for (let y = 0; y < size; y++) {
			if (y < midPoint) {
				image[x].push(random());
			} else {
				image[x].push(random());
			}
		}
	}

	return image;
}
