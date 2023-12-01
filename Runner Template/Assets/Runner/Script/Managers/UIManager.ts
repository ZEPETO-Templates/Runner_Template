import { GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameManagerRunner from './GameManagerRunner';
import TimerManagerRunner from './TimerManagerRunner';
import ScoreManager from './ScoreManager';
import GameOverPanel from '../UI/GameOverPanel';
import { Text } from 'UnityEngine.UI';

// This class manages everything related to the UI
export default class UIManager extends ZepetoScriptBehaviour 
{

    public static Instance: UIManager; // This class instance

    public PointTxt: Text; // Points text reference in general game interface
    public timeTxt: Text; // Reference to the time text in the general game interface

    @SerializeField() gameOverPanel: GameObject; // Game over panel reference
    @SerializeField() gameStartPanel: GameObject; // Reference to start game panel

    // Awake is called when the script instance is being loaded
    Awake() {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // https://en.wikipedia.org/wiki/Singleton_pattern
        if (UIManager.Instance != null) GameObject.Destroy(this.gameObject);
        UIManager.Instance = this;
    }

    // Update is called every frame, if the MonoBehaviour is enabled
    Update()
    {
        // The timer will run once the game starts
        if(GameManagerRunner.Instance.isGameRunning)
        {
            this.PointTxt.text = ScoreManager.Instance.GetPoints().toString();
            this.timeTxt.text = TimerManagerRunner.Instance.GetTimeFormated();
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