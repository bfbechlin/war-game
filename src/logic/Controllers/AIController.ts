import { Controller } from './ControllerInterface';
import { Action } from '../Support';

export class AIController implements Controller {

    resolveAction = function() {

        return Action.Pass;

    };

  }
