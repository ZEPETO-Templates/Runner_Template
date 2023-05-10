import { GameObject, MonoBehaviour, Vector3 } from 'UnityEngine';
import { SpawnInfo, ZepetoPlayers, ZepetoCharacter } from 'ZEPETO.Character.Controller';
import { WorldService } from 'ZEPETO.World';
import TimerManagerRunner from './TimerManagerRunner';
import LevelGenerator from './LevelGenerator';
import ScoreManager from './ScoreManager';
import UIManager from './UIManager';

export default class GameManagerRunner extends MonoBehaviour 
{

    public static Instance: GameManagerRunner;

    public isGameRunning: bool;
    public playerSpawnPoint: GameObject;
    private _zepetoCharacter: ZepetoCharacter;

    public Awake(): void 
    {
        if (GameManagerRunner.Instance == null) GameManagerRunner.Instance = this;
        else GameObject.Destroy(this);
    }
    
    Start() 
    {
        // Instance of the player zepeto
        ZepetoPlayers.instance.CreatePlayerWithUserId(WorldService.userId, new SpawnInfo(), true);
        
        // The instantiation can take a few seconds, the following lines are executed once this happens
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this._zepetoCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
            
            this._zepetoCharacter.transform.position = this.playerSpawnPoint.transform.position;
            this._zepetoCharacter.transform.Rotate(new Vector3(0, 90, 0));
            this._zepetoCharacter.gameObject.tag = "Player";
            this._zepetoCharacter.gameObject.SetActive(false);

            UIManager.Instance.OnStart();
        });
      
    }

    // When starting the game, the parameters are restored and the blocks start moving
    public OnGameStart() 
    {
        TimerManagerRunner.Instance.StartTimer();
        LevelGenerator.Instance.InitializeLevel();
        
        this._zepetoCharacter.gameObject.SetActive(true);
        this._zepetoCharacter.Teleport(this.playerSpawnPoint.transform.position, this.playerSpawnPoint.transform.rotation);
        
        setTimeout(() => LevelGenerator.Instance.SetBlocksMovement(true), 1500);
        
        UIManager.Instance.OnStartGame();
    }
    
    // This method resets the entire game state and will start the level again
    public OnGameReset()
    {
        LevelGenerator.Instance.ResetLevel();
        ScoreManager.Instance.ResetPoints();
        TimerManagerRunner.Instance.ResetTimer();

        this.OnGameStart();
    }

    // At the end of the game, the blocks are stopped and the UI is updated
    public OnGameOver()
    {
        LevelGenerator.Instance.SetBlocksMovement(false);
        UIManager.Instance.OnGameOver();
    }

}