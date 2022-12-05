import { generateRandomNumber, shuffleCards } from '../util';
import GameRepository from './game.repository';
import { Game, GameStatus, ICard } from './game.types';

class GameService {
  private gameRepository: GameRepository;

  constructor() {
    this.gameRepository = new GameRepository();
  }

  async getCurrentGame(): Promise<Game> {
    return await this.gameRepository.getCurrentGame();
  }

  async resetCurentGame(): Promise<Game> {
    return await this.gameRepository.resetGame();
  }

  async dealCards(totalToDeal: number = 5): Promise<{ dealed: ICard[]; game: Game }> {
    const game: Game = await this.gameRepository.getCurrentGame();

    if (game.status !== GameStatus.ONGOING) {
      return { dealed: [], game };
    }

    const cards: ICard[] = shuffleCards(game.cardsLeft);
    const dealedCards: ICard[] = [];
    while (cards.length && dealedCards.length < totalToDeal) {
      const toPick = shuffleCards(cards.filter((c) => !dealedCards.includes(c)));

      const randomNum = generateRandomNumber(0, toPick.length - 1);
      const card: ICard = toPick[randomNum];

      dealedCards.push(card);
    }

    const updatedGame = await this.gameRepository.dealCards(dealedCards);

    return {
      dealed: dealedCards,
      game: updatedGame,
    };
  }
}

export default GameService;
