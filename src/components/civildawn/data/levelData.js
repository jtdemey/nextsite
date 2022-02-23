/**
 * Creates a LEVEL_DATA object
 * @param {string} color Color associated with level
 * @param {string} display Display name
 * @param {number} levelId Level ID
 * @param {string} name Level name
 * @param {Array} enemySpawnRange Array with two numbers representing enemy spawan range
 * @param {Array} groundAltRange Array with two numbers representing ground altitude range
 * @param {Array} groundWidthRange Array with two numbers representing ground segment width range
 * @returns Level data object
 */
const genLevelData = (
  color,
  display,
  levelId,
  name,
  enemySpawnRange = [400, 500],
  groundAltRange = [100, 220],
  groundWidthRange = [180, 260]
) => ({
	color,
	display,
	enemySpawnRange,
	groundAltRange,
	groundWidthRange,
	levelId,
	name
});

export const LEVEL_IDS = {
  CIVIL_DUSK: 1,
  NAUTICAL_DUSK: 2,
  ASTRONOMICAL_DUSK: 3,
  NIGHTFALL: 4,
  NIGHTFALL2: 5,
  NIGHTFALL3: 6,
  NIGHT: 7,
  MIDNIGHT: 8,
  MORNING: 9,
  SUNRISE: 11,
  SUNRISE2: 12,
  SUNRISE3: 13,
  ASTRONOMICAL_DAWN: 14,
  NAUTICAL_DAWN: 15,
  CIVIL_DAWN: 16
};

export const LEVEL_DATA = [
	genLevelData(
		"#E77329",
		"1: CIVIL DUSK",
		LEVEL_IDS.CIVIL_DUSK,
		"civildusk",
		[100, 500],
		[100, 220],
		[180, 260]
	),
	genLevelData(
		"#B15243",
		"2: NAUTICAL DUSK",
		LEVEL_IDS.NAUTICAL_DUSK,
		"nauticaldusk",
		[380, 490],
		[150, 300],
		[180, 260]
	),
	genLevelData(
		"#2D2E55",
		"3: ASTRONOMICAL DUSK",
		LEVEL_IDS.ASTRONOMICAL_DUSK,
		"astronomicaldusk",
		[400, 500],
		[100, 220],
		[180, 260]
	),
	genLevelData(
		"#1F2347",
		"4: NIGHTFALL I",
		LEVEL_IDS.NIGHTFALL,
		"nightfall",
		[400, 500],
		[100, 220],
		[180, 260]
	),
	genLevelData(
		"#382F58",
		"5: NIGHTFALL II",
		LEVEL_IDS.NIGHTFALL2,
		"nightfall2",
		[400, 500],
		[100, 220],
		[180, 260]
	),
	genLevelData(
		"#9A371E",
		"6: NIGHTFALL III",
		LEVEL_IDS.NIGHTFALL3,
		"nightfall3",
		[400, 500],
		[100, 220],
		[180, 260]
	),
	genLevelData(
		"#9A371E",
		"7: NIGHT",
		LEVEL_IDS.NIGHT,
		"night",
		[400, 500],
		[100, 220],
		[180, 260]
	),
	genLevelData(
		"#9A371E",
		"8: MIDNIGHT",
		LEVEL_IDS.MIDNIGHT,
		"midnight",
		[400, 500],
		[100, 220],
		[180, 260]
	),
	genLevelData(
		"#9A371E",
		"9: MORNING",
		LEVEL_IDS.MORNING,
		"morning",
		[400, 500],
		[100, 220],
		[180, 260]
	),
	genLevelData(
		"#9A371E",
		"10: SUNRISE I",
		LEVEL_IDS.SUNRISE,
		"sunrise",
		[400, 500],
		[100, 220],
		[180, 260]
	),
	genLevelData(
		"#9A371E",
		"11: SUNRISE II",
		LEVEL_IDS.SUNRISE2,
		"sunrise2",
		[400, 500],
		[100, 220],
		[180, 260]
	),
	genLevelData(
		"#9A371E",
		"12: SUNRISE III",
		LEVEL_IDS.SUNRISE3,
		"sunrise3",
		[400, 500],
		[100, 220],
		[180, 260]
	),
	genLevelData(
		"#9A371E",
		"13: ASTRONOMICAL DAWN",
		LEVEL_IDS.ASTRONOMICAL_DAWN,
		"astronomicaldawn",
		[400, 500],
		[100, 220],
		[180, 260]
	),
	genLevelData(
		"#9A371E",
		"14: NAUTICAL DAWN",
		LEVEL_IDS.NAUTICAL_DAWN,
		"nauticaldawn",
		[400, 500],
		[100, 220],
		[180, 260]
	),
	genLevelData(
		"#9A371E",
		"15: CIVIL DAWN",
		LEVEL_IDS.CIVIL_DAWN,
		"civildawn",
		[400, 500],
		[100, 220],
		[180, 260]
	)
];