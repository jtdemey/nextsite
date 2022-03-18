import Phaser from "phaser";
import game from "./game";
import { getRandBetween, makePt } from "../cdUtils";
import player from "./player";
import collisionCats from "./collision";
import { makePickup, spawnPickup } from "./pickups";

/**
 * Ground entity data
 */
const ground = {
  xInd: 0,
  yInd: 0,
  bodies: [],
  paths: [],
  graphics: null,
  widthRange: [100, 200],
  altRange: [0, 100]
};

export default ground;

/**
 * Adds a physics body to the provided path
 * @param {Scene} scene Phaser game scene
 * @param {Path} path Phaser path
 * @param {number} xPos X coordinate
 */
export const addBodyToGround = (scene, path, xPos) => {
  const body = scene.matter.add.fromVertices(xPos, 0, path, {
    collisionFilter: {
      category: collisionCats.GROUND
    }
  });
  body.isStatic = true;
  body.pwType = "body";
  scene.matter.alignBody(
    body,
    xPos,
    path[0].y,
    Phaser.Display.Align.BOTTOM_LEFT
  );
  ground.bodies.push(body);
};

/**
 * Draws the ground
 */
export const drawGround = () => {
  if (ground.paths.length > 0) {
    ground.paths.forEach(path => {
      fillGroundSegment(path);
    });
  }
};

/**
 * Uses the game's graphics to fill a segment of ground
 * @param {Path} path Phaser path
 */
export const fillGroundSegment = path => game.graphics.fillPoints(path, true);

/**
 * Gets a Phaser path for a piece of ground
 * @param {number} segmentLength Amount of triangles (slopes) to create
 * @returns Phaser path for a segment of ground
 */
export const makeGroundSegments = segmentLength => {
  let xInd = 0,
    yInd = game.height - 100;
  if (ground.paths.length > 0) {
    let lastPath = ground.paths[ground.paths.length - 1];
    xInd = lastPath[lastPath.length - 1].x;
    yInd = lastPath[lastPath.length - 2].y;
  }
  let wr = ground.widthRange,
    ar = ground.altRange,
    ogX = xInd;
  const path = [makePt(xInd, game.height), makePt(xInd, yInd)];
  for (let i = 0; i < segmentLength; i++) {
    const w = getRandBetween(wr[0], wr[1]);
    xInd = xInd + w;
    yInd = getRandBetween(ar[0], ar[1]);
    path.push(makePt(xInd, yInd));
  }
  path.push(makePt(xInd, game.height));
  ground.xInd = xInd;
  ground.yInd = yInd;
  ground.paths.push(path);
  addBodyToGround(player.scene, path, ogX);
  return path;
};

/**
 * Scrolls the ground across the scene
 * @param {Scene} scene Phaser game scene
 * @param {number} speed How fast the ground should scroll
 */
export const scrollGround = (scene, speed) => {
  if (ground.paths.length > 4) {
    ground.paths.shift();
    ground.bodies.shift();
  }
  if (ground.paths.length > 0) {
    ground.paths.forEach((path, index) => {
      path.forEach(v => {
        v.x -= speed;
      });
      if (
        index === ground.paths.length - 1 &&
        path[path.length - 1].x < game.width + 200
      ) {
        makeGroundSegments(10);
      }
    });
    drawGround();
  }
  if (ground.bodies.length > 0) {
    ground.bodies.forEach(body => {
      const newX = body.position.x - speed;
      scene.matter.body.setPosition(body, { x: newX, y: body.position.y });
    });
  }
};