export function calculateProficiencyBonus(level) {
  switch (true) {
    case level <= 4:
      return 2;
    case level >= 5 && level <= 8:
      return 3;
    case level >= 9 && level <= 12:
      return 4;
    case level >= 13 && level <= 16:
      return 5;
    case level >= 17:
      return 6;
    default:
      return 0;
  }
}
