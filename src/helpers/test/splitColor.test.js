import {individualColors} from "../splitColor";
import chroma from "chroma-js";

it("splits colors of an image", () => {
    const image = [[chroma(1, 2, 3)], [chroma(4, 5, 6)]];
    expect(individualColors(image)).toStrictEqual({
        red: [[1], [4]],
        green: [[2], [5]],
        blue: [[3], [6]]
    })
});