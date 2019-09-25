import imageCopy from "../helpers/imageCopy";

export function rotateImage(image) {
    const newImage = [];

    for(let i = 0; i < image.length; i++) {
        newImage.push([]);
    }

    image.forEach((row, x) => {
        row.forEach((pixel, y) => {
            newImage[y].push(pixel);
        });
    });

    return newImage;
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

export function shuffleRows(image) {
    return imageCopy(image.map(row => shuffle(row)));
}

export function randomize(image) {
    const newImage = imageCopy(image);
    return shuffleRows(rotateImage(shuffle(shuffleRows(newImage))));
}