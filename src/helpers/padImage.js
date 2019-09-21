import imageCopy from "./imageCopy";

export function padImage(image) {
    let paddedImage = imageCopy(image);
    let imgLength = paddedImage.length;

    paddedImage.push(paddedImage[imgLength-1].slice());
    paddedImage.unshift(paddedImage[0].slice());

    paddedImage = paddedImage.map(row => {
        const len = row.length;
        row.push(row[len-1]);
        row.unshift(row[0]);
        return row;
    });

    return paddedImage;
}