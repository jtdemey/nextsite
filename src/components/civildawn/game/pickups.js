import game from "./game";

const pickups = [];

export default pickups;

export const makePickup = (x, y) => {
	const text = game.scene.add.text(
		x,
		y,
		"$",
		{
			color: "#000",
			fontFamily: `Coda`,
			fontSize: "1.5rem"
		}
	);
};