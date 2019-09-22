import {imageMap} from "../helpers/imageMap";
import chroma from "chroma-js";

export function invert(image) {
    return imageMap(image, pixel => {
        const [r,g,b] = chroma(pixel).rgb();
        return chroma(255-r, 255-g, 255-b);
    });
}