import chroma from "chroma-js";
import imageCopy from "../helpers/imageCopy";
import {padImage} from "../helpers/padImage";
import {sum} from "../helpers/add";
import {individualColors} from "../helpers/splitColor";

function getKernalValue(img, kernal) {
	const newColors = [];

	for(let x = 0; x < img.length; x++) {
		newColors.push([]);
		for (let y = 0; y < img.length; y++) {
			newColors[x].push(img[x][y] * kernal[x][y])
		}
	}

	const average = sum(newColors.flat())/sum(kernal.flat());

	console.log({img, kernal, newColors, average});

	return average;
}

export function getKernalPixels(image, x, y, size=3) {
	const pixels = [];
	let paddedImage = [];

	x += 1;
	y += 1;

	const start = -1 * Math.floor((size-1)/2) + y;
	const end = Math.ceil((size-1)/2) + y;


	for (let i = 0; i < size-2; i++) {
		paddedImage = padImage(image);
	}

	for (let i = 0; i < size; i++) {
		pixels.push(paddedImage[x - 1 + i].slice(start, end+1));
	}

	return pixels;
}

export function applyKernal(image, kernal) {
	// make a new copy
	const newImage = imageCopy(image);

	const size = newImage.length - 1;

	if (size < 1) {
		return newImage;
	}

	for (let x = 0; x <= size; x++) {
		for (let y = 0; y <= size; y++) {
			const pixels = getKernalPixels(image, x, y);

			const {red, green, blue} = individualColors(pixels);

			let _red = getKernalValue(red, kernal);
			let _green = getKernalValue(green, kernal);
			let _blue = getKernalValue(blue, kernal);

			newImage[x][y] = chroma(_red, _green, _blue, 1).hex();
		}
	}

	console.log({newImage});

	return newImage;
}
