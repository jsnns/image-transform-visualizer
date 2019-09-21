import {applyKernal} from "./applyKernal";

export function sharpen(image) {
    return applyKernal(image, [[0, -0.5, 0], [-0.5, 3, -0.5], [0, -0.5, 0]])
}