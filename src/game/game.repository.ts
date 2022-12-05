import { CardType, Game, GameStatus, ICard } from './game.types';

class GameRepository {
  private game: Game | undefined;

  constructor() {
    this.initMockGame();
  }

  async initMockGame(): Promise<void> {
    const cards: ICard[] = [];
    for (let i = 1; i <= 13; i++) {
      for (let k = 0; k < 4; k++) {
        let value;
        let type: CardType;
        if (i === 1) {
          value = 'A';
        } else if (i === 11) {
          value = 'J';
        } else if (i === 12) {
          value = 'Q';
        } else if (i === 13) {
          value = 'K';
        } else {
          value = String(i);
        }

        if (k === 0) {
          type = CardType.CLUBS;
        } else if (k === 1) {
          type = CardType.DIAMONDS;
        } else if (k === 2) {
          type = CardType.HEART;
        } else {
          type = CardType.SPADES;
        }

        cards.push({ type, value });
      }
    }
    this.game = {
      id: 'sample-game-id',
      cardsLeft: cards,
      acesLeft: cards.filter((c) => c.value === 'A') ?? [],
      status: GameStatus.ONGOING,
    };
  }

  async getCurrentGame(): Promise<Game> {
    if (!this.game) {
      throw new Error('Game was not found.');
    }

    return this.game;
  }

  async resetGame(): Promise<Game> {
    await this.initMockGame();

    if (!this.game) {
      throw new Error('Game was not found.');
    }

    return this.game;
  }

  async dealCards(cards: ICard[]): Promise<Game> {
    if (!this.game) {
      throw new Error('Game was not found.');
    }
    const gameCards = this.game.cardsLeft.filter((gameCard) => !cards.includes(gameCard));

    this.game.cardsLeft = gameCards;
    this.game.acesLeft = gameCards.filter((gc) => gc.value === 'A');

    if (!this.game.acesLeft?.length) {
      this.game.status = GameStatus.GAME_LOST;
    }

    if (!this.game.cardsLeft?.length && this.game.acesLeft?.length) {
      this.game.status = GameStatus.GAME_WON;
    }

    return this.game;
  }
}

export default GameRepository;
