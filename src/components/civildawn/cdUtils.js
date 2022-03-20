import Phaser from "phaser";
import game from "./game/game";

/**
 * Gets an array of points along a given Path
 * @param {string} path Phaser Path object
 * @returns Array of points along path
 */
export const convertPathToPoints = path => {
  const res = [];
  const splitPath = path.split(" ");
  let index = 0;
  for (let i = 0; i < splitPath.length / 2; i++) {
    const point = new Phaser.Geom.Point(splitPath[index], splitPath[index + 1]);
    res.push(point);
    index += 2;
  }
  return res;
};

/**
 * Generates a random string of the given length
 * @param {number} len Length of string
 * @returns Random string
 */
export const genId = len => {
  const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  let id = "";
  for (let i = 0; i < len; i++) {
    const cInd = Math.floor(Math.random() * abc.length);
    const c = abc.charAt(cInd);
    id += c;
  }
  return id;
};

/**
 * Returns the closest point to the specified target in the provided array
 * @param {number} targetX Target's X coordinate
 * @param {number} targetY Target's Y coordinate
 * @param {Point[]} points Array of points to check
 * @returns Closest point to target in array
 */
export const getClosestPtTo = (targetX, targetY, points) => {
  if (points.length < 2) {
    return points[0];
  }
  let ptInd = 0;
  let leastDist = undefined;
  points.forEach((p, i) => {
    let dist = getDistBetweenPts(p.x, p.y, targetX, targetY);
    if (leastDist === undefined || dist < leastDist) {
      leastDist = dist;
      ptInd = i;
    }
  });
  return points[ptInd];
};

/**
 * Gets the distance between two points
 * @param {number} x1 First point's X coordinate
 * @param {number} y1 First point's Y coordinate
 * @param {number} x2 Second point's X coordinate
 * @param {number} y2 Second point's Y coordinate
 * @returns {number} Distance between the two points
 */
export const getDistBetweenPts = (x1, y1, x2, y2) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

/**
 * Gets the hypotenuse angle given the adjacent and opposite side lengths
 * @param {number} oppLen Length of the opposite triangle side
 * @param {number} adjLen Length of the adjacent triangle side
 * @returns Hypotenuse angle in degrees
 */
export const getHypotenuseAngle = (oppLen, adjLen) => {
  return Math.atan(oppLen / adjLen);
};

/**
 * Gets length of Line
 * @param {Phaser.Geom.Line} line Line
 * @returns Length of line
 */
export const getLineLength = line => {
  return Math.sqrt(
    Math.pow(line.x2 - line.x1, 2) + Math.pow(line.y2 - line.y1, 2)
  );
};

/**
 * Gets Phaser Color from hex code
 * @param {string} hex Hexadecimal color code
 * @returns Phaser Color
 */
export const getPhaserColorFromHex = hex =>
  new Phaser.Display.Color.HexStringToColor(hex).color;

/**
 * Gets random number between two values (inclusively)
 * @param {number} min Minimum value
 * @param {number} max Maximum value
 * @returns Random number in range
 */
export const getRandBetween = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

/**
 * Gets a random property value of an object
 * @param {object} obj Any object
 * @returns Random property of the object
 */
export const getRandomProperty = obj => {
  const keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
};

/**
 * Creates and returns a Phaser Point at the given position
 * @param {number} x X coordinate
 * @param {number} y Y coordinate
 * @returns Phaser Point
 */
export const makePt = (x, y) => new Phaser.Geom.Point(x, y);

/**
 * Refreshes the game's width and height to fit the size of the browser window
 */
export const refreshClientDims = () => {
  const siteWrapper = document.querySelector("#site-wrapper");
  game.width = siteWrapper.clientWidth;
  game.height = siteWrapper.clientHeight;
};

/**
 * Gets the X coordinate of a sprite's physics body
 * @param {Sprite} entity Any sprite with a Matter physics body
 * @returns X coordinate of sprite's body
 */
export const xPos = entity => entity.body.position.x;

/**
 * Gets the Y coordinate of a sprite's physics body
 * @param {Sprite} entity Any sprite with a Matter physics body
 * @returns Y coordinate of sprite's body
 */
export const yPos = entity => entity.body.position.y;