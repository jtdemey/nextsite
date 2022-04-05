import { scrollGround, drawGround } from "./ground";
import player from "./player";
import game from "./game";
import { setMousePos } from "./controls";
import { updateProgressBar } from "./progressBar";
import enemies from "./enemies";
import { updateBullets } from "./bullets";
import { updatePowerups } from "./powerups";
import { updateOverlaps } from "./overlaps";
import { scrollPickups } from "./pickups";

/**
 * Game main tick function
 */
export default function () {
  if (game.paused) {
    return;
  } else {
		try {
			game.onTick();
			player.onTick();
			if (enemies.length > 0) {
				enemies.forEach(e => e.onTick());
			}
			setMousePos(this.input.mousePointer.x, this.input.mousePointer.y);
			scrollGround(this, game.speed);
			scrollPickups(game.speed);
			drawGround();
			updateProgressBar();
			updateBullets();
			updatePowerups();
			updateOverlaps();
		} catch (e) {
			console.error("Error in game tick", e);
		}
  }
}