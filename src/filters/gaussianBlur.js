import {applyKernal} from "./applyKernal";

export function gaussianBlur(image) {
    return applyKernal(image, [[0, 2, 0], [2, 4, 2], [0, 2, 0]])
}