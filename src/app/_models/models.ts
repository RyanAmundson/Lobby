export class Pool {
  id: string;
  costRatio: number;
  currentRound: number;
  // lastRefresh:number;
  name: string;
  statement: string;
  tokens: number;
  maxTokens: number;
  trivia: Array<TriviaItem>;
  dividend: number;
}

export class TriviaItem {
  category: string;
  correct_answer: boolean;
  difficulty: string;
  incorrect_answers: Array<string>;
  question: string;
  type: string;
}

export class Player {
  id: string;
  isPartyLeader: boolean;
  money: number;
  name: string;
  tokens: number;
}

export class Game {
  players: Player[];
  pools: Pool[];
}

export class GameSettings {
  numberOfRounds?: number;
  schedule?: Array<number>;
  startTime?: number;
  state?: string;
  playerStartingMoney?: number;
  playerStartingTokens?: number;
  poolStartingTokens?: number;
  dividendAmount?: number;
  roundLength?: number;
}

// export class GameConfig {

// }
