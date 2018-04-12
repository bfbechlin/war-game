
export enum Action{
    PlaceTroop = 'PlaceTroop',
    Attack = 'Attack',
    Pass = 'Pass',
    Forfeit = 'Forfeit',
    Ended = 'Ended',
}

export type PlaceTroops = {
  targetCountry: String
  numberOfTroops: number
}
export type Force = {
  numberOfTroops: number
  location: String
}

export type Attack = {
  targetCountry: String
  troops: Force[]
}

export type PlayerAction = {
  type: Action
  sender: String
  payload: PlaceTroops | Attack | undefined
}

export function createAction(action: PlayerAction) {
  return action
}
