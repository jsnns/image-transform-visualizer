import { getKernalPixels } from "../meanBlur";

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
