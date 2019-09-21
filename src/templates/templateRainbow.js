const rainbow = ["#FF0000", "#ff7e00", "#fff300", "#49ff00", "#0074ff", "#6e00ff", "#c800ff"];

export function templateRainbow(size) {
    const totalColors = rainbow.length;
    const rowsPerColor = Math.floor(size/totalColors);

    const midColor = Math.floor(totalColors/2);
    const extraRows = size - (rowsPerColor * totalColors)

    const image = [];

    for(let color = 0; color < totalColors; color++) {
        const row = [];

        for(let i = 0; i < size; i++) {
            row.push(rainbow[color]);
        }

        for(let y = 0; y < rowsPerColor; y++) {
            image.push(row);
        }

        if(color === midColor) {
            for(let y = 0; y < extraRows; y++) {
                image.push(row);
            }
        }
    }

    return image;
}