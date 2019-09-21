import {applyKernal} from "./applyKernal";

export function meanBlur(image) {
    return applyKernal(image, [[1, 1, 1], [1, 1, 1], [1, 1, 1]])
}