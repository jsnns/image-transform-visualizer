import imageCopy from "./imageCopy";

export function padImage(image) {
    let paddedImage = imageCopy(image);

    paddedImage.push(paddedImage[paddedImage.length-1].slice());
    paddedImage.unshift(paddedImage[0].slice());

    return paddedImage.map(row => {
        row.push(row[row.length-1]);
        row.unshift(row[0]);
        return row;
    });
}