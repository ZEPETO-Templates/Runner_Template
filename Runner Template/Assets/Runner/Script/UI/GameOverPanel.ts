import { Button, Text } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameManagerRunner from '../Managers/GameManagerRunner';
import UIManager from '../Managers/UIManager';

// This class controls the view of the endgame panel
export default class GameOverPanel extends ZepetoScriptBehaviour 
{

    public retryButton: Button; // Retry button reference
    public tittlePointsTxt: Text; // Points text reference
    public tittleTimerTxt: Text; // Timer text reference

    // Start is called on the frame when a script is enabled just before any of the Update methods is called the first time
    Start()
    {
        // The call to the method to reset the game is assigned to the button event
        this.retryButton.onClick.AddListener(this.OnGameReset);
    }

    // This method is called when the retry button is pressed
    OnGameReset(): void 
    {
        // Called the game manager to reset the game
        // The call is made via the static instance of the singleton
        GameManagerRunner.Instance.OnGameReset();
    }

    // The values ​​displayed in the game over panel are updated 
    // with the data currently displayed in the UI by the GameManager
    public updateGameOverPanel() 
    {
        this.tittlePointsTxt.text =  UIManager.Instance.PointTxt.text;
        this.tittleTimerTxt.text = UIManager.Instance.timeTxt.text;
    }
  
}