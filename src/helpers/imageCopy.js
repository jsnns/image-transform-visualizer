export default function imageCopy(image) {
	return image.map(row => row.slice());
}
