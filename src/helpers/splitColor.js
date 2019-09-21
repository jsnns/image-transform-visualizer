import chroma from "chroma-js";

export function individualColors(image) {
    const red = [];
    const green = [];
    const blue = [];

    for(let x = 0; x < image.length; x++) {
        red.push([]);
        green.push([]);
        blue.push([]);
        for (let y = 0; y < image[x].length; y++) {
            const [r, g, b] = chroma(image[x][y]).rgb();
            red[x].push(r);
            green[x].push(g);
            blue[x].push(b);
        }
    }

    return {red, green, blue}
}