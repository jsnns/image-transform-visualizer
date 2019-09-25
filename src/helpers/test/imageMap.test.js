import {imageMap} from "../imageMap";

it("maps f onto each pixel", () => {
    const image = [[1, 2, 3], [4, 5, 6]];
    const transformedImage = imageMap(image, a => a*2);

    expect(transformedImage).toStrictEqual([[2, 4, 6], [8, 10, 12]])
});