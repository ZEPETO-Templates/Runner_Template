import { GameObject, Quaternion, Vector3 } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import MoveBlock from './MoveBlock';

// This class is an implementation of the Object Pool pattern for better performance.
// https://en.wikipedia.org/wiki/Object_pool_pattern
// This pool can only use one type of block at a time
export default class BlockPool extends ZepetoScriptBehaviour 
{
    
    public blockPrefab: GameObject; // Reference of the prefab block to be used by the pool
    private _difficultyLevel: number; // Internal reference of the difficulty level of the blocks handled by this pool

    private _reserve: number; // Initial amount of reservation items in this pool
    private _activeList: GameObject[]; // Internal array of active elements
    private _reserveList: GameObject[]; // Internal array of elements in reserve
    private _numberReserved: number; // Current number of items in reserve, this value is used to define if it is necessary to create new items

    // Awake is called when the script instance is being loaded
    public Awake(): void
    {
        // Initialized from empty arrays
        this._activeList = [];
        this._reserveList = [];

        // Default value of the reservation amount
        this._reserve = 2;

        // Allocation of the current number of items in reserve
        this._numberReserved = this._reserve;

        // Internal difficulty level reference is saved
        // This value is taken from the block that was assigned to this pool
        this.SetDifficultyLevel(this.blockPrefab.GetComponent<MoveBlock>().difficultyLevel);

        // Reservation Initialized
        this.initializeReserve();
    }

    // Initialization of the reservation array
    private initializeReserve()
    {
        for(let i = 0; i < this._reserve; i++)
        {
            // Instantiating a new block from the referenced prefab
            let newBlockVariant = GameObject.Instantiate(this.blockPrefab) as GameObject;

            // Assign this block pool as reference for each block
            // This reference is necessary to return the block once it has been used.
            newBlockVariant.GetComponent<MoveBlock>().blockPool = this;

            // This block is assigned as a child of this gameobject, deactivated and added to the reserve array
            newBlockVariant.transform.parent = this.gameObject.transform;
            newBlockVariant.SetActive(false);
            this._reserveList.push(newBlockVariant);
        }
    }

    // Get a block or create a new one if needed
    // This method receives as a parameter the position in which the block will be located
    public getBlock(position: Vector3): GameObject
    {
        // If there is no block available, it is created
        if(this._numberReserved == 0)
        {
            // Instantiating a new block from the referenced prefab
            let newBlockVariant = GameObject.Instantiate(
                this.blockPrefab, position,
                Quaternion.identity,
                this.transform
            ) as GameObject;

            // Assign this block pool as reference for each block
            // This reference is necessary to return the block once it has been used.
            newBlockVariant.GetComponent<MoveBlock>().blockPool = this;
            
            // The new block is added to the reserve array and the reserve item counter is incremented
            this._reserveList.push(newBlockVariant);
            this._numberReserved++;
        }
        
        // Get a gameobject from the reserve array and reduce the reserve item counter
        const gameObject = this._reserveList.pop();
        this._numberReserved--;
        
        // The block is added to the array of active elements
        this._activeList.push(gameObject);
        
        // The block is located based on the position passed by parameter
        gameObject.transform.position = position;

        // It is assigned as a child of this gameobject, the default rotation is applied and it is activated
        gameObject.transform.parent = this.gameObject.transform;
        gameObject.transform.rotation = Quaternion.identity;
        gameObject.SetActive(true);

        // Finally, the block reference is returned
        return gameObject;
    }

    // This method receives a block by parameter and returns it to the reserve array
    public returnBlock(gameObject: GameObject)
    {
        // Get the index of the gameObject in the active array
        const index = this._activeList.indexOf(gameObject);
        if(index >= 0)
        {
            // The block is removed from the active array
            this._activeList.splice(index, 1);

            // And is added to the reserve array
            this._reserveList.push(gameObject);
            this._numberReserved++;

            // Turn off the gameobject in reserve and set its movement to stop
            gameObject.GetComponent<MoveBlock>().SetMoving(false);
            gameObject.SetActive(false);
        }
    }

    // This method allows setting the internal value of difficulty
    public SetDifficultyLevel(value: number)
    {
        this._difficultyLevel = value;
    }

    // This method allows obtaining the internal value of difficulty
    public GetDifficultyLevel():number
    {
        return this._difficultyLevel;
    }
    
}