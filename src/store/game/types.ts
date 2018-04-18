export interface GameState {
  round: number;
  state: 'INIT' | 'ALLOCATE' | 'ATTACK' | 'FINAL';
  remainingTime: number;
  turnOwner: string;
  cardsChangeBonus: number;
}