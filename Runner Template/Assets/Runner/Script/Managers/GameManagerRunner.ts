import { GameObject, MonoBehaviour, Vector3 } from 'UnityEngine';
import { SpawnInfo, ZepetoPlayers, ZepetoCharacter } from 'ZEPETO.Character.Controller';
import { WorldService } from 'ZEPETO.World';
import TimerManagerRunner from './TimerManagerRunner';
import LevelGenerator from './LevelGenerator';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import ScoreManager from './ScoreManager';
import UIManager from './UIManager';
 
//This class is the main manager that controls the general state of the game
export default class GameManagerRunner extends ZepetoScriptBehaviour 
{

    public static Instance: GameManagerRunner; // This class instance
    public isGameRunning: bool; // Flag that indicates if the game is running
    public playerSpawnPoint: GameObject; // Reference to a gameobject that functions as a spawn location for the player
    
    private _zepetoCharacter: ZepetoCharacter; // Reference of ZepetoCharacter

    // Awake is called when the script instance is being loaded
    public Awake(): void 
    {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // https://en.wikipedia.org/wiki/Singleton_pattern
        if (GameManagerRunner.Instance == null) GameManagerRunner.Instance = this;
        else GameObject.Destroy(this);
    }
    
    // Start is called on the frame when a script is enabled just before any of the Update methods is called the first time
    Start() 
    {
        // Initial state of the game
        this.isGameRunning = false;

        // Instance of the player zepeto
        ZepetoPlayers.instance.CreatePlayerWithUserId(WorldService.userId, new SpawnInfo(), true);
        
        // The instantiation can take a few seconds, the following lines are executed once this happens
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            
            // The reference of the instance of the ZepetoCharacter is taken
            this._zepetoCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;

            // The "player" tag is assigned and the ZepetoCharacter gameobject is disabled
            // This tag is necessary to check the collision of the player
            this._zepetoCharacter.gameObject.tag = "Player";
            this._zepetoCharacter.gameObject.SetActive(false);

            // The UIManager is told to display the initial UI
            UIManager.Instance.OnStart();
        });
      
    }

    // This method initializes the game
    // The parameters are restored and the blocks start moving
    public OnGameStart() 
    {
        // Timer and level initialization
        TimerManagerRunner.Instance.StartTimer();
        LevelGenerator.Instance.InitializeLevel();
        
        // ZepetoCharacter gameobject reactivated and positioned
        // The location of the ZepetoCharacter can be assigned using a method of its own class
        // "Teleport" that receives as parameters a position and a rotation which in this case are taken from the spawnPoint
        this._zepetoCharacter.gameObject.SetActive(true);
        this._zepetoCharacter.Teleport(this.playerSpawnPoint.transform.position, this.playerSpawnPoint.transform.rotation);
        
        // "setTimeout" allows us to call a method after a given time in milliseconds
        // In this case, we delay the start of movement of the blocks to coincide with the start of the running animation of ZepetoCharacter
        setTimeout(() => LevelGenerator.Instance.SetBlocksMovement(true), 1500);
        
        // The UIManager is told to display the game interface
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

    // This method defines the state of the end of the game
    public OnGameOver()
    {
        // ZepetoCharacter is disabled
        this._zepetoCharacter.gameObject.SetActive(false);

        // The movement of the blocks is stopped
        LevelGenerator.Instance.SetBlocksMovement(false);

        // The UIManager is told to display the game over interface
        UIManager.Instance.OnGameOver();
    }

}