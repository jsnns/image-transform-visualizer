export function templateCheckerboard(size, colors) {
    const image = [];

    for (let x = 0; x < size; x++) {
        image.push([]);
        for (let y = 0; y < size; y++) {
            if ((y + (x % 2)) % 2 === 0) {
                image[x].push(colors[0])
            } else {
                image[x].push(colors[1])
            }
        }
    }

    return image;
}