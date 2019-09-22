export function imageMap(image, f) {
    return image.map(row => row.map(pixel => f(pixel)));
}