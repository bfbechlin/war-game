export interface GameState {
  round: number;
  mode: 'CPU' | 'PVP';
  state: 'INIT' | 'ALLOCATE' | 'ATTACK' | 'FINAL';
  remainingTime: number;
  turnOwner: string;
  cardsChangeBonus: number;
}