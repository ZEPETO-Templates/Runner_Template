import { Debug, GameObject, Random } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameManagerRunner from './GameManagerRunner';
import TimerManagerRunner from './TimerManagerRunner';
import BlockPool from '../Block/BlockPool';
import MoveBlock from '../Block/MoveBlock';

// This class is responsible for general levels
export default class LevelGenerator extends ZepetoScriptBehaviour 
{

    public static Instance: LevelGenerator; // This class instance

    public blockPools: GameObject[]; // Block Pools array

    public difficultyLevelsTimeLimits: number[]; // This array contains the times when the difficulty level will go up (In seconds 10, 50, 120, 260, etc)
    public levelSpeedByDifficulty: number[]; // This array contains the speed levels that accompany each difficulty jump

    public startBlockPrefab: GameObject; // Reference of the initial block, this is different from those generated
    public startBlockSpawnPoint: GameObject; // Reference to the spawn point of the initial block

    private _lastBlock: GameObject; // Internal reference of the last block
    private _blockToDelete: GameObject; // A reference to the next block to be removed
    private _currentBlocksShowed: GameObject[]; // An array containing all the blocks currently displayed

    private _currentDifficultyLevel: number; // Internal reference of the current difficulty level

    // Awake is called when the script instance is being loaded
    public Awake(): void 
    {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // https://en.wikipedia.org/wiki/Singleton_pattern
        if (LevelGenerator.Instance == null) LevelGenerator.Instance = this;
        else GameObject.Destroy(this);
    }

    // Update is called every frame, if the MonoBehaviour is enabled
    Update() 
    {
        // The elapsed time in seconds since the game started is obtained from the TimeManager
        // And is used to evaluate if the time limit has been exceeded to increase the level of difficulty
        let seconds = TimerManagerRunner.Instance.GetTime() as number;
        if(seconds > this.difficultyLevelsTimeLimits[this._currentDifficultyLevel])
        {
            this._currentDifficultyLevel++;
        }
    }

    public InitializeLevel(): void 
    {
        // Initialized difficulty level at 0
        this._currentDifficultyLevel = 0; 
        
        // The currently displayed blocks are initialized from an empty array
        this._currentBlocksShowed = []; 
        
        // The first block is activated and positioned, the rest are requested to their respective pools
        this.startBlockPrefab.SetActive(true);
        this.startBlockPrefab.transform.position = this.startBlockSpawnPoint.transform.position;

        // The first block is added to the array of currently displayed blocks
        this._currentBlocksShowed.push(this.startBlockPrefab);

        // Then this block is assigned as a reference of the last added block
        this._lastBlock = this.startBlockPrefab;
        
        // Finally, the method responsible for generating the first random block is called
        this.GenerateBlock();
    }

    // To generate a block, a random block pool is selected and then a block is requested
    public GenerateBlock(): void 
    {
        // This flag is needed to check the exit of the loop that is responsible for finding a valid BlockPool
        let isValidPool = false;

        // This variable will contain a random number
        // In this case, this number represents the randomly obtained BlockPool index.
        let n = 0;
        
        // We are going to take random values ​​until we find a BlockPool that meets the difficulty level allowed at this time.
        while(!isValidPool){

            // We get a random number between 0 and the number of BlockPools
            n = Math.floor(Random.Range(0,this.blockPools.length)) as number;

            // We compare if this value is below the current difficulty level
            if(this.blockPools[n].GetComponent<BlockPool>().GetDifficultyLevel() <= this._currentDifficultyLevel)
            {
                // If the difficulty level is less than or equal to the current difficulty level, 
                // we exit the loop and have now saved the index of that BlockPool
                isValidPool = true;
            }

            // If not, we'll go back to look for another random index

            // DEV NOTE:: 
            // This operation can be optimized in many ways, 
            // but to avoid complicating the understanding of how this class works.
            // This low-performance mechanic is currently used.

        }

        // Get the position to generate the next block from the last
        let Pos = this._lastBlock.transform.GetChild(0).transform.position;

        // With the index corresponding to the BlackPool "n", 
        // we ask the BlockPool of the matrix to generate a block for us 
        // and we pass it as a parameter the position in which it will be located
        // Finally we save a reference to that new block
        let block = this.blockPools[n].GetComponent<BlockPool>().getBlock(Pos);

        // We use the reference of the generated block and assign it internally to the last block
        // In this way, we can repeat the block generation process from the last
        this._lastBlock = block as GameObject;

        // Each generated block is added to an array for later reset and set in motion
        this._currentBlocksShowed.push(block);

        // We access the "MoveBlock" component and start it up by calling its internal method "SetMoving",
        // in this case it is defined by the "isGameRunning" state maintained by the GameManagerRunner
        this._lastBlock.GetComponent<MoveBlock>().SetMoving(GameManagerRunner.Instance.isGameRunning);

        // Finally we call the method that will define the speed based on the current difficulty level
        this.SetBlocksSpeed();
    }

    // This method is responsible for adjusting the speed of the generated blocks based on the current level of difficulty
    public SetBlocksSpeed()
    {
        // Loop through the array of blocks currently displayed
        this._currentBlocksShowed.forEach(blockElement => {

            // We verify that there is a speed adjustment according to the level
            if(this.levelSpeedByDifficulty[this._currentDifficultyLevel] != null)
            {
                // If so, we access the "MoveBlock" component and set the speed as defined in the respective array
                blockElement.GetComponent<MoveBlock>().SetSpeed(this.levelSpeedByDifficulty[this._currentDifficultyLevel]);
            }
        });
    }

    // This method enables the movement of the blocks and additionally defines when the game is running
    public SetBlocksMovement(value:bool):void 
    {
        // Since this method is called when there is a collision with the player,
        // it is also used to define the state of "isGameRunning" in the GameManagerRunner.
        GameManagerRunner.Instance.isGameRunning = value;

        // We traverse the array of currently displayed blocks and set whether they are moving or not
        this._currentBlocksShowed.forEach(blockElement => {
            blockElement.GetComponent<MoveBlock>().SetMoving(value);
        });

        // If at the end of the game there is a block to be deleted 
        // (the last one that is out of the array of those currently shown), this is also set
        if(this._blockToDelete != null)
        {
            this._blockToDelete.GetComponent<MoveBlock>().SetMoving(value);
        }
    }

    // This method removes the last block
    public RemoveLastBlock() 
    {
        // The "shift" method removes and returns a reference to the last object in an array
        // We save this reference in the internal variable of Block to delete
        this._blockToDelete = this._currentBlocksShowed.shift();

        // Then we call the internal method to remove the block passing that reference by parameter
        this.RemoveFirstOrReturnToPool(this._blockToDelete);
    }
    
    // This method resets the level
    public ResetLevel()
    {
        // We loop through the array of currently displayed blocks 
        // and call the internal method to remove or return them to their respective pools
        this._currentBlocksShowed.forEach(blockElement => {
            this.RemoveFirstOrReturnToPool(blockElement);
        });

        // Reset the internal value of the difficulty level and clean up the array of currently displayed blocks
        this._currentDifficultyLevel = 0;
        this._currentBlocksShowed = [];
    }

    // If it is the StartBlock, the GameObject is deactivated, if not it is returned to its respective pool
    private RemoveFirstOrReturnToPool(element: GameObject)
    {
        // We compare if the block is the initial one or one that belongs to a pool
        if(element == this.startBlockPrefab)
        {
            // In case of being the initial block, the movement is deactivated
            // and it's deactivated
            element.GetComponent<MoveBlock>().SetMoving(false);
            element.SetActive(false);
        }
        else
        {
            // If it belongs to a pool, its internal return method is called
            element.GetComponent<MoveBlock>().ReturnToPool();
        }
    }

}