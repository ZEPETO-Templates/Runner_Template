import { Button } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameManagerRunner from '../Managers/GameManagerRunner';

// This class controls the view of the start game panel
export default class GameStartPanel extends ZepetoScriptBehaviour {

    public startButton: Button; // Start button reference
  
    // Start is called on the frame when a script is enabled just before any of the Update methods is called the first time
    Start()
    {
      // The call to the method to start the game is assigned to the button event
      this.startButton.onClick.AddListener(this.OnGameStart);
    }
  
     // This method is called when the start button is pressed
    OnGameStart(): void 
    {
      // Called the game manager to start the game
      // The call is made via the static instance of the singleton
      GameManagerRunner.Instance.OnGameStart();
    }

}