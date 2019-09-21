import {padImage} from "../padImage";

it("padds an image", () => {
    const image = [[1]];

    expect(padImage(image)).toEqual([[1, 1, 1], [1, 1, 1], [1, 1, 1]])
});