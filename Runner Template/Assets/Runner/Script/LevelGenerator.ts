import { Collider, GameObject, Vector3, MonoBehaviour, Quaternion, Random, Object, Debug } from 'UnityEngine';
import BlockLevel from './BlockLevel';
import SpawnBlockLevel from './SpawnBlockLevel';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

/**
 * A class that generates and manages the level's blocks.
 */
export default class LevelGenerator extends MonoBehaviour {
  private static instance: LevelGenerator;
  public Blocks: GameObject[]; // an array of available blocks
  public FirstBlock: GameObject; // the first block in the scene
  public VelocitiBlock: number; // the speed at which blocks move
  public test: string; // just a test variable, not used in the code
  public LastBlock: GameObject; // the last generated block

  // Make the constructor private
  private constructor() {
    super();
  }

  /**
   * A method to get the unique instance of LevelGenerator.
   * @returns The instance of LevelGenerator.
   */
  public static getInstance(): LevelGenerator {
    if (!LevelGenerator.instance) {
      LevelGenerator.instance = new LevelGenerator();
      return LevelGenerator.instance;
    }
    else {
      return this.instance;
    }
  }

  Awake() {
    // This method is called once at the beginning, before Start()
  }

  Start() {
    this.LastBlock = this.FirstBlock; // the last generated block is the first block
    this.GenerateBlock(); // generate a block
  }

  /**
   * A method to generate a block.
   */
  public GenerateBlock(): void {
    let n = Math.floor(Random.Range(0,this.Blocks.Length)) as number; // get a random index to select a block from the Blocks array
    let Pos = this.LastBlock.transform.GetChild(0).transform.position; // get the position of the SpawnBlockLevel of the last generated block
    let block = GameObject.Instantiate(this.Blocks[n], Pos, Quaternion.identity) as GameObject; // instantiate the selected block and place it at the position of the SpawnBlockLevel of the last generated block
    this.LastBlock = block as GameObject; // update the last generated block
  }
}

