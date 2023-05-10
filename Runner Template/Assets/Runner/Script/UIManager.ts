import { GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameOverPanel from './GameOverPanel';
import { TextMeshProUGUI } from 'TMPro';
import GameManagerRunner from './GameManagerRunner';
import TimerManagerRunner from './TimerManagerRunner';
import ScoreManager from './ScoreManager';

export default class UIManager extends ZepetoScriptBehaviour 
{

    public static Instance: UIManager;

    public PointTxt: TextMeshProUGUI; 
    public timeTxt: TextMeshProUGUI; 

    @SerializeField() gameOverPanel: GameObject;
    @SerializeField() gameStartPanel: GameObject;

    Awake() {
        if (UIManager.Instance != null) GameObject.Destroy(this.gameObject);
        UIManager.Instance = this;
    }

    Update()
    {
        // The timer will run once the game starts
        if(GameManagerRunner.Instance.isGameRunning)
        {
            this.PointTxt.text= "Points: "+ ScoreManager.Instance.GetPoints().toString();
            this.timeTxt.text= "Time: " + TimerManagerRunner.Instance.GetTimeFormated();
        }
    }

    // When the game starts for the first time, the start panel is shown for the one time
    OnStart() {
        this.gameStartPanel.SetActive(true);
        this.gameOverPanel.SetActive(false);
    }

    // Once the game starts running, all panels are turned off.
    OnStartGame() {
        this.gameStartPanel.SetActive(false);
        this.gameOverPanel.SetActive(false);
    }

    // Once the game ends, the game over panel is displayed and updated
    OnGameOver(): void {
        this.gameOverPanel.SetActive(true);
        this.gameOverPanel.GetComponent<GameOverPanel>().updateGameOverPanel();
    }

}