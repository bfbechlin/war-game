export const isActivePlayer = (turnOwner: string, activePlayers: string[]) => (
  activePlayers.indexOf(turnOwner) > -1 
);