export enum CardType {
  CLUBS = 'CLUBS',
  DIAMONDS = 'DIAMONDS',
  HEART = 'HEARTS',
  SPADES = 'SPADES',
}

export type ICard = {
  type: CardType;
  value: string;
};

export enum GameStatus {
  ONGOING = 'ONGOING',
  GAME_WON = 'GAME_WON',
  GAME_LOST = 'GAME_LOST',
}

export type Game = {
  id: string;
  cardsLeft: ICard[];
  acesLeft: ICard[];
  status: GameStatus;
};
