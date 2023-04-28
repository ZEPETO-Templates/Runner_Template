import { GameObject, MonoBehaviour, Transform, Vector3, Time } from 'UnityEngine';
import { Button } from 'UnityEngine.UI';
import { TextMeshProUGUI } from 'TMPro';
import BlockLevel from './BlockLevel';
import SpawnBlockLevel from './SpawnBlockLevel';
import LevelGenerator from './LevelGenerator';
import GameOverManager from './GameOverManager';
import PointsManager from './PointsManager';
import TimerManagerRunner from './TimerManagerRunner';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { SpawnInfo, ZepetoPlayers, LocalPlayer,ZepetoCharacter } from 'ZEPETO.Character.Controller';

export default class GameManagerRunner extends MonoBehaviour {

  

  public Blocks: GameObject[];
  public FirstBlock: GameObject;
  public LastBlock: GameObject;

  
  public GameOverPrefabUI: GameObject;
  public ParentUI: Transform;

  public startButton: Button; 

    
    public PointTxt: TextMeshProUGUI; 
     public TimeTxt: TextMeshProUGUI; 

  private gameOver: GameOverManager;
  private level: LevelGenerator;
  private points: PointsManager;
  private timer: TimerManagerRunner;
   private zepetoCharacter: ZepetoCharacter;




  private awakeCalled: boolean = false;
  /// <summary>
  /// Function that initializes the game components
  /// <summary>
  private initializeComponents(): void {
    this.level = LevelGenerator.getInstance();
    this.level.Blocks = this.Blocks;
    this.level.FirstBlock = this.FirstBlock;
    this.level.LastBlock = this.LastBlock;

    this.gameOver = GameOverManager.getInstance();
    this.gameOver.GameOverPrefabUI = this.GameOverPrefabUI;
    this.gameOver.ParentUI = this.ParentUI;

    this.points = PointsManager.getInstance();
    this.timer = TimerManagerRunner.getInstance();

    this.points.ResetPoints();
    this.timer.ResetTimer();
    this.timer.StartTimer();

 
  }


  /// <summary>
  /// Function that initializes the game blocks
  /// <summary>
  private initializeBlocks(): void {
    this.level.GenerateBlock();
  }


  /// <summary>
  /// Function that calls the necessary initialization functions
  /// <summary>
  private initialize(): void {
    this.initializeComponents();
    this.initializeBlocks();
    
  }

  
  public Awake(): void {
   
      this.initialize();
     this.startButton.onClick.AddListener(this.StartGame);
      
  }

   Start() {
     
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this.zepetoCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
             this.zepetoCharacter.transform.Rotate(new Vector3(0, 90, 0));
             this.zepetoCharacter.gameObject.tag="Player";
             
           
        });

      Time.timeScale = 0;
     

   }
 
     Update(){
     let time = this.timer.GetTime() as number;
    let minutes = Math.floor(time / 60000).toString() as string;
    let seconds = ((time % 60000)).toFixed(0).padStart(2, '0') as string;

     this.PointTxt.text= "Point: "+ this.points.GetPoints().toString();
     this.TimeTxt.text= "Time: "+ minutes + ':' + seconds;;

    }

    public StartGame(){
     
        Time.timeScale = 1;
    }
  
}