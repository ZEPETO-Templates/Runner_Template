import { TextMeshProUGUI } from 'TMPro';
import { Application, Time } from 'UnityEngine';
import { SceneManager } from 'UnityEngine.SceneManagement';
import { Button } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import PointsManager from './PointsManager';
import TimerManagerRunner from './TimerManagerRunner';

export default class GameOverScreenRunner extends ZepetoScriptBehaviour {

  public gameOverTittle = 'Game Over';
  public gameOverSubtittle = 'Time is up!';
  public gameOverTittlePoints = 'Points: ';
  public gameOverTittleTime = 'Time: ';

  // Reference to the "Retry" button
  public retryButton: Button;
  public tittleTxt: TextMeshProUGUI;
  public subtittleTxt: TextMeshProUGUI;
  public TittlePointsTxt: TextMeshProUGUI;
  public TittleTimerTxt: TextMeshProUGUI;

  // Reference to TimerManagerRunner
  public Timer: TimerManagerRunner;

  // Reference to PointsManager
  private _pointsManager: PointsManager;

  // This method is executed when any value is changed in the editor
  OnValidate() {
    this.tittleTxt.text = this.gameOverTittle;
    this.subtittleTxt.text = this.gameOverSubtittle;
  }

  Start() {
    // Get the instance of PointsManager and TimerManagerRunner
    this._pointsManager = PointsManager.getInstance();
    this.Timer = TimerManagerRunner.getInstance();

    // Display points on screen
    this.TittlePointsTxt.text =
      this.gameOverTittlePoints + this._pointsManager.GetPoints().toString();

    // Display time on screen
    let time = this.Timer.GetTime() as number;
    let minutes = Math.floor(time / 60000).toString() as string;
    let seconds = ((time % 60000)).toFixed(0).toString() as string;
    this.TittleTimerTxt.text =
      this.gameOverTittleTime + minutes + ':' + seconds;

    // Display title and subtitle
    this.tittleTxt.text = this.gameOverTittle;
    this.subtittleTxt.text = this.gameOverSubtittle;

    // Assign the listener to the Retry button
    this.retryButton.onClick.AddListener(this.RetryBtnAction);
  }

      // This method is executed when the Retry button is clicked
      RetryBtnAction(): void {
       
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
        Time.timeScale = 1;
      }
}
