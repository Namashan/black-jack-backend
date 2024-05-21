interface EndGameResponse {
    playerName: string;
    isWinner: string;
    cardsSum: number;
    enemyCardsSum: number;
    lastRound: number;
}

export default EndGameResponse;