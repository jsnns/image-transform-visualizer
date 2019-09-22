import chroma from "chroma-js";
import imageCopy from "../helpers/imageCopy";
import {padImage} from "../helpers/padImage";
import {sum} from "../helpers/add";
import {individualColors} from "../helpers/splitColor";

function getKernalValue(pixels, kernal, xy) {
	const {red, green, blue} = individualColors(pixels);

	let _red = [], _green = [], _blue = [];

	if (typeof kernal === "function") {
		kernal = kernal(...xy);
	}

	for(let x = 0; x < pixels.length; x++) {
		for (let y = 0; y < pixels.length; y++) {
			_red.push(red[x][y] * kernal[x][y]);
			_green.push(green[x][y] * kernal[x][y]);
			_blue.push(blue[x][y] * kernal[x][y]);
		}
	}

	const kernalTotal = sum(kernal.flat());

	const newColor = {
		red: sum(_red) / kernalTotal,
		green: sum(_green) / kernalTotal,
		blue: sum(_blue) / kernalTotal
	};

	return chroma(newColor.red, newColor.green, newColor.blue);
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

export function applyKernal(image, kernal, noCopy=false) {
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

			newImage[x][y] = getKernalValue(pixels, kernal, [x, y]).hex();
		}
	}

	return newImage;
}
