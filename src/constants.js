export const ROWS = 4;

export const COLS = 4;

export const directions = {
  DOWN: 'DOWN',
  UP: 'UP',
  RIGHT: 'RIGHT',
  LEFT: 'LEFT'
};

export const gameStatuses = {
  ACTIVE: 'ACTIVE',
  FINISHED: 'FINISHED'
};

export const keyCodes = {
  38: directions.UP,
  40: directions.DOWN,
  39: directions.RIGHT,
  37: directions.LEFT
};

export const tileColors = {
  2: '#a8e6cf',
  4: '#dcedc1',
  8: '#ffd3b6',
  16: '#ffaaa5',
  32: '#ff8b94',
  64: '#997a8d',
  128: '#aa98a9',
  256: '#b39eb5',
  512: '#777696',
  1024: '#796878',
  2048: '#444444'
};

export const tileFontSizes = {
  3: '3em',
  2: '2em'
};
