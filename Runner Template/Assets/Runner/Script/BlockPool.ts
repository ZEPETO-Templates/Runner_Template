import { GameObject, Quaternion, Vector3 } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import MoveBlock from './MoveBlock';

// This class is an implementation of the Object Pool pattern for better performance.
// This pool can only use one type of block at a time
export default class BlockPool extends ZepetoScriptBehaviour 
{
    
    // Reference of the prefab block to be used by the pool
    public blockPrefab: GameObject;
    public difficultyLevel: number;

    private _reserve: number;

    private _activeList: GameObject[];
    private _reserveList: GameObject[];

    private _numberReserved: number;

    public Awake(): void
    {
        this._activeList = [];
        this._reserveList = [];

        // Default value of the reservation amount
        this._reserve = 2;

        this._numberReserved = this._reserve;

        this.difficultyLevel = this.blockPrefab.GetComponent<MoveBlock>().difficultyLevel;

        this.initializeReserve();
    }

    // Initialization of the reservation with a default value of 2 blocks
    private initializeReserve()
    {
        for(let i = 0; i < this._reserve; i++)
        {
            let newBlockVariant = GameObject.Instantiate(this.blockPrefab) as GameObject;

            // Assign this block pool as reference for each block
            // This reference is necessary to return the block once it has been used.
            newBlockVariant.GetComponent<MoveBlock>().blockPool = this;
            newBlockVariant.transform.parent = this.gameObject.transform;
            newBlockVariant.SetActive(false);
            this._reserveList.push(newBlockVariant);
        }
    }

    // Get a reserve list block or create a new one if needed
    // This method receives as a parameter the position in which the block will be located
    public getBlock(position: Vector3): GameObject
    {
        // If there is no block available, it is created
        if(this._numberReserved == 0)
        {
            let newBlockVariant = GameObject.Instantiate(
                this.blockPrefab, position,
                Quaternion.identity,
                this.transform
            ) as GameObject;

            // Assign this block pool as reference for each block
            // This reference is necessary to return the block once it has been used.
            newBlockVariant.GetComponent<MoveBlock>().blockPool = this;
            
            this._reserveList.push(newBlockVariant);
            this._numberReserved++;
        }
        
        const gameObject = this._reserveList.pop();
        this._numberReserved--;
        
        this._activeList.push(gameObject);
        
        gameObject.transform.parent = this.gameObject.transform;
        gameObject.transform.position = position;
        gameObject.transform.rotation = Quaternion.identity;
        gameObject.SetActive(true);

        return gameObject;
    }

    public returnBlock(gameObject: GameObject)
    {
        // Get the index of the gameObject in the active list
        const index = this._activeList.indexOf(gameObject);
        if(index >= 0)
        {
            this._activeList.splice(index, 1);

            // Add it to the reserve:
            this._reserveList.push(gameObject);
            this._numberReserved++;

            // Turn off the gameobject in reserve and motion disabled
            gameObject.GetComponent<MoveBlock>().SetMoving(false);
            gameObject.SetActive(false);
        }
    }
    
}