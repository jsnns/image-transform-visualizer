/**
 * Transform an image by applying a function to each pixel
 * @param image
 * @param f
 * @returns {*}
 */
export function imageMap(image, f) {
    return image.map(row => row.map(pixel => f(pixel)));
}