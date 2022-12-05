import GameService from './game/game.service';

const gameService = new GameService();

export const resolvers = {
  Query: {
    currentGame: async () => await gameService.getCurrentGame(),
  },
  Mutation: {
    deal: async () => {
      return await gameService.dealCards();
    },
    reset: async () => {
      return await gameService.resetCurentGame();
    },
  },
};
