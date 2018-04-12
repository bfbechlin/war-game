import { Action } from '../Support';
export interface Controller {
    // Method called by the GameManager to play a player action (TRANSFORM TO OBSEVABLE FOR FUNCTIONAL)
    resolveAction: () => Action;

}
