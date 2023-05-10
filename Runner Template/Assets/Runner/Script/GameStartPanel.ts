import { Button } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameManagerRunner from './GameManagerRunner';

export default class GameStartPanel extends ZepetoScriptBehaviour {

    public startButton: Button;
  
    Start()
    {
      this.startButton.onClick.AddListener(this.OnGameStart);
    }
  
    OnGameStart(): void 
    {
      GameManagerRunner.Instance.OnGameStart();
    }

}