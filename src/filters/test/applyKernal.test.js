import { getKernalPixels, getPixelValue } from "../applyKernal";
import chroma from "chroma-js";

it("gets the correct pixels", () => {
    let image = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
    let pixels = getKernalPixels(image, 0, 0);

    expect(pixels).toEqual([[1, 1, 2], [1, 1, 2], [1, 1, 2]]);

    image = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    pixels = getKernalPixels(image, 1, 1);

    expect(pixels).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

    image = [[1]];
    pixels = getKernalPixels(image, 0, 0);

    expect(pixels).toEqual([[1, 1, 1], [1, 1, 1], [1, 1, 1]]);
});

it("handles a one-pixel image", () => {
    let image = [[1]];
    let pixels = getKernalPixels(image, 0, 0);

    expect(pixels).toEqual([[1, 1, 1], [1, 1, 1], [1, 1, 1]]);
});

it("gets the pixel's value", () => {
    let pixels = [[[1, 1, 1], [1, 1, 1], [1, 1, 1]], [[1, 1, 1], [2, 2, 2], [1, 1, 1]], [[1, 1, 1], [1, 1, 1], [1, 1, 1]]];
    let kernal = [[0, 1, 0], [0, 1, 0], [0, 0, 0]];

    expect(getPixelValue(pixels, kernal, null)).toStrictEqual(chroma(1.5, 1.5, 1.5))
});