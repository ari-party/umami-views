export default function getNearestMidnight() {
  const now = Date.now();

  let currentMidnight: Date | number = new Date(now);
  currentMidnight.setHours(0, 0, 0, 0);
  currentMidnight = currentMidnight.getTime();

  let nextMidnight: Date | number = new Date(currentMidnight);
  nextMidnight.setHours(24, 0, 0, 0);
  nextMidnight = nextMidnight.getTime();

  // Calculate the difference in milliseconds
  const diffToCurrentMidnight = Math.abs(now - currentMidnight);
  const diffToNextMidnight = Math.abs(nextMidnight - now);

  // Return the nearest midnight
  return diffToCurrentMidnight <= diffToNextMidnight
    ? currentMidnight
    : nextMidnight;
}
