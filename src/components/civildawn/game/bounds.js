import game from './game';
import collisionCats from './collision';
import { makePt } from '../cdUtils';

/**
 * The collision boundaries of the game map
 */
const bounds = {
  left: null,
  right: null
};

export default bounds;

/**
 * Disables boundary collision for level transitions
 */
export const disableBoundCollision = () => {
  bounds.left.collisionFilter.category = 0;
  bounds.right.collisionFilter.category = 0;
};

/**
 * Enables boundary collision for play
 */
export const enableBoundCollision = () => {
  bounds.left.collisionFilter.category = collisionCats.BOUNDARY;
  bounds.right.collisionFilter.category = collisionCats.BOUNDARY;
};

/**
 * Initializes the boundary entities
 */
export const initBounds = () => {
  const makeBound = (x, y, verts) => game.scene.matter.add.fromVertices(x, y, verts, {
    collisionFilter: {
      category: collisionCats.BOUNDARY,
      mask: collisionCats.PLAYER
    },
    isStatic: true
  });
  const rectPts = [makePt(0, 0), makePt(0, game.height), makePt(20, game.height), makePt(20, 0)];
  bounds.left = makeBound(-10, game.height / 2, rectPts);
  bounds.right = makeBound(game.width + 10, game.height / 2, rectPts);
};

/**
 * Sets boundaries past the screen borders for level transitions
 */
export const setExtendedBounds = () => {
  game.scene.matter.world.setBounds(-100, 0, game.width + 520, game.height, 1, true, true, false, true);
};

/**
 * Sets boundaries to the screen borders
 */
export const setFixedBounds = () => {
  game.scene.matter.world.setBounds(0, 0, game.width, game.height, 1, true, true, false, true);
};