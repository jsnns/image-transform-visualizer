import {applyKernal} from "./applyKernal";

export function gaussianBlur(image) {
    return applyKernal(image, [[1, 2, 1], [2, 4, 2], [1, 2, 1]])
}