import collisionCats, { nonCollidingGroup } from "./collision";
import game from "./game";

const pickups = {
  sprites: []
};

export default pickups;

export const consumePickup = pickup => {};

export const makePickup = (x, y) => {
  const pickup = game.scene.matter.add.sprite(x, y, "pickup");
  console.log(pickup);
  pickup.setIgnoreGravity(true);
  pickup.setCollisionCategory(collisionCats.PICKUP);
  pickup.setCollisionGroup(nonCollidingGroup);
  pickups.sprites.push(pickup);
  return pickup;
};