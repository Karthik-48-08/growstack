/**
 * Tiny client-side mirror of the backend's level math.
 * Source of truth lives in backend/src/controllers/progressController.js —
 * keep these in sync if you ever change the curve.
 *
 * Levels are computed as:  floor(xp / 500) + 1
 *  - Level 1 starts at 0 XP
 *  - Level 2 at 500, Level 3 at 1000, ...
 */
export const XP_PER_LEVEL = 500;

export function computeLevel(xp = 0) {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

/**
 * The XP threshold at which a given level is *reached*.
 *   levelThreshold(1) === 0
 *   levelThreshold(2) === 500
 *   levelThreshold(3) === 1000
 */
export function levelThreshold(level) {
  return Math.max(0, (level - 1) * XP_PER_LEVEL);
}

/**
 * Percent progress (0-100) from the bottom of the current level to the top.
 */
export function progressToNextLevel(xp = 0) {
  const lvl = computeLevel(xp);
  const floor = levelThreshold(lvl);
  const ceil = levelThreshold(lvl + 1);
  const span = ceil - floor || 1;
  return Math.min(100, Math.round(((xp - floor) / span) * 100));
}
