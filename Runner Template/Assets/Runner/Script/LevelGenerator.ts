import { GameObject, MonoBehaviour, Random } from 'UnityEngine';
import GameManagerRunner from './GameManagerRunner';
import BlockPool from './BlockPool';
import MoveBlock from './MoveBlock';

export default class LevelGenerator extends MonoBehaviour 
{

    public static Instance: LevelGenerator;

    // A list of block pools
    public blockPools: GameObject[];

    public startBlockPrefab: GameObject;
    public startBlockSpawnPoint: GameObject;

    private _firstBlock: GameObject;
    private _lastBlock: GameObject;
    private _blockToDelete: GameObject;
    private _currentBlocksShowed: GameObject[];

    public Awake(): void 
    {
        if (LevelGenerator.Instance == null) LevelGenerator.Instance = this;
        else GameObject.Destroy(this);
    }

    // The first block is activated and positioned, the rest are requested to their respective pools
    public InitializeLevel(): void 
    {
        this._currentBlocksShowed = [];
        let startBlocSpawnTransform = this.startBlockSpawnPoint.transform;

        this.startBlockPrefab.SetActive(true);
        this.startBlockPrefab.transform.position = startBlocSpawnTransform.position;
        this._firstBlock = this.startBlockPrefab;

        this._currentBlocksShowed.push(this._firstBlock);
        this._lastBlock = this._firstBlock;
        this.GenerateBlock();
    }

    // To generate a block, a random block pool is selected and then a block is requested
    public GenerateBlock(): void 
    {
        let n = Math.floor(Random.Range(0,this.blockPools.length)) as number;
        let Pos = this._lastBlock.transform.GetChild(0).transform.position;
        let block = this.blockPools[n].GetComponent<BlockPool>().getBlock(Pos);

        this._lastBlock = block as GameObject;

        // Each generated block is added to an array for later reset and set in motion
        this._currentBlocksShowed.push(block);
        this._lastBlock.GetComponent<MoveBlock>().SetMoving(GameManagerRunner.Instance.isGameRunning);
    }

    // This method enables the movement of the blocks and additionally defines when the game is running
    public SetBlocksMovement(value:bool):void 
    {
        GameManagerRunner.Instance.isGameRunning = value;
        this._currentBlocksShowed.forEach(blockElement => {
            blockElement.GetComponent<MoveBlock>().SetMoving(value);
        });

        if(this._blockToDelete != null)
        {
            this._blockToDelete.GetComponent<MoveBlock>().SetMoving(value);
        }
    }

    public RemoveLastBlock() 
    {
        this._blockToDelete = this._currentBlocksShowed.shift();
        this.RemoveFirstOrReturnToPool(this._blockToDelete);
    }
    
    public ResetLevel()
    {
        this._currentBlocksShowed.forEach(blockElement => {
            this.RemoveFirstOrReturnToPool(blockElement);
        });
        this._currentBlocksShowed = [];
    }

    // If it is the StartBlock, the GameObject is deactivated, if not it is returned to its respective pool
    private RemoveFirstOrReturnToPool(element: GameObject)
    {
        if(element == this.startBlockPrefab)
        {
            // In case of being the initial block, the movement is deactivated
            element.GetComponent<MoveBlock>().SetMoving(false);
            element.SetActive(false);
        }
        else
        {
            element.GetComponent<MoveBlock>().ReturnToPool();
        }
    }

}