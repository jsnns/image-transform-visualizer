import React from "react";
import { fadeIn } from "react-animations";
import Radium, { StyleRoot } from "radium";

const styles = {
	bounce: delay => ({
		animation: "x",
		animationFillMode: "forwards",
		animationDelay: `${delay}s`,
		animationName: Radium.keyframes(fadeIn, "bounce")
	})
};

export let Pixel = ({ color, size, style }) => (
	<div
		className="pixel"
		style={{
			...style,
			opacity: 0,
			backgroundColor: color,
			height: size,
			width: size
		}}
	/>
);

Pixel = Radium(Pixel);

export let Image = ({ image, pixelSize }) => {
	if (!image) return <div />;

	return (
		<div className="image">
			<StyleRoot>
				<div className="inner-image">
					{/* create image of rows */}
					{image.map((row, x) => (
						// create rows of pixels
						<div className="row" style={{ height: pixelSize }}>
							{row.flatMap((pixel, y) => (
								<Pixel
									size={pixelSize}
									color={pixel}
									style={styles.bounce(y / (image.length * 2))}
								/>
							))}
						</div>
					))}
				</div>
			</StyleRoot>
		</div>
	);
};

Image = Radium(Image);
