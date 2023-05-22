import { TextMeshProUGUI } from 'TMPro';
import { Button } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameManagerRunner from './GameManagerRunner';
import UIManager from './UIManager';

export default class GameOverPanel extends ZepetoScriptBehaviour 
{

    public retryButton: Button;
    public tittlePointsTxt: TextMeshProUGUI;
    public tittleTimerTxt: TextMeshProUGUI;

    Start()
    {
        this.retryButton.onClick.AddListener(this.OnGameReset);
    }

    // The values ​​displayed in the game over panel are updated 
    // with the data currently displayed in the UI by the GameManager
    public updateGameOverPanel() 
    {
        this.tittlePointsTxt.text = "Points: " + UIManager.Instance.PointTxt.text;
        this.tittleTimerTxt.text = "Time: " + UIManager.Instance.timeTxt.text;
    }

    OnGameReset(): void 
    {
        GameManagerRunner.Instance.OnGameReset();
    }
  
}