import { GameObject, Time, Transform } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';


export default class GameOverManager extends ZepetoScriptBehaviour {
  private static instance: GameOverManager;
  public GameOverPrefabUI: GameObject;
  public ParentUI: Transform;

  // Static method to get a unique instance of the GameOverManager class
  public static getInstance(): GameOverManager {
    if (!GameOverManager.instance) {
      GameOverManager.instance = new GameOverManager();
    }
    return GameOverManager.instance;
  }

  // Method to show the Game Over screen
  public showGameOver(): void {
    GameObject.Instantiate(this.GameOverPrefabUI, this.ParentUI);
    Time.timeScale = 0;
   
  }
}