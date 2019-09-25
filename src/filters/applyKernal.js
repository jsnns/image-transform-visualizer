import chroma from "chroma-js";
import imageCopy from "../helpers/imageCopy";
import {padImage} from "../helpers/padImage";
import {sum} from "../helpers/sum";
import {individualColors} from "../helpers/splitColor";

export function getPixelValue(pixels, kernel, xy) {
	const {red, green, blue} = individualColors(pixels);

	let _red = [], _green = [], _blue = [];

	if (typeof kernel === "function") {
		kernel = kernel(...xy);
	}

	for(let x = 0; x < pixels.length; x++) {
		for (let y = 0; y < pixels.length; y++) {
			_red.push(red[x][y] * kernel[x][y]);
			_green.push(green[x][y] * kernel[x][y]);
			_blue.push(blue[x][y] * kernel[x][y]);
		}
	}

	const kernelTotal = sum(kernel.flat());

	const newColor = {
		red: sum(_red) / kernelTotal,
		green: sum(_green) / kernelTotal,
		blue: sum(_blue) / kernelTotal
	};

	return chroma(newColor.red, newColor.green, newColor.blue);
}

export function getKernalPixels(image, x, y, size=1) {
	const pixels = [];
	let paddedImage = [];

	x += 1;
	y += 1;

	const start = y - size;
	const end = size + y;

	// pad image 'size' times
	for (let i = 0; i < size; i++) {
		paddedImage = padImage(image);
	}

	for (let i = -size; i <= size; i++) {
		pixels.push(paddedImage[x+i].slice(start, end+1));
	}
	
	return pixels;
}

export function applyKernal(image, kernel, noCopy=false) {
	// make a new copy
	let newImage = imageCopy(image);

	if (noCopy) {
		newImage = image;
	}

	const size = newImage.length - 1;

	if (size < 1) {
		return newImage;
	}

	for (let x = 0; x <= size; x++) {
		for (let y = 0; y <= size; y++) {
			const pixels = getKernalPixels(image, x, y);

			newImage[x][y] = getPixelValue(pixels, kernel, [x, y]).hex();
		}
	}

	return newImage;
}
