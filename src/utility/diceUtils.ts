export const MAX_DICE_VALUE = 12;
export const MIN_DICE_VALUE = 1;

export const rollDice = (): number => Math.floor(Math.random() * 12) + 1;
