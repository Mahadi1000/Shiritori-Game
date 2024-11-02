export interface GameState {
    playerTurn: 'player1' | 'player2';
    player1Score : number;
    player2Score: number;
    words: string[];
    lastWord: string;
    entries: Array<any>
}