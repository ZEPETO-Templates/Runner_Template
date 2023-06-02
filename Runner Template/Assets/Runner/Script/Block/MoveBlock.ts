import { Vector3, GameObject, Time } from "UnityEngine";
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import BlockPool from "./BlockPool";
import PointTargetRunner from "../Elements/PointTargetRunner";

// This class is in charge of managing the movement behavior of the Blocks
export default class MoveBlock extends ZepetoScriptBehaviour 
{

    public blockPool: BlockPool; // reference to the BlookPool to which this block belongs
    public difficultyLevel: number; // Difficulty level assigned to this block

    public speed: number; // Current movement speed of the block
    public isMoving: bool; // Flag indicating whether the block should be moving or not

    public points: GameObject[]; // Array of Points or Coins

    // Awake is called when the script instance is being loaded
    public Awake(): void 
    {
        this.speed = 4;
        this.isMoving = false;
    }

    // Update is called every frame, if the MonoBehaviour is enabled
    Update() 
    {
        // In the update if the flag indicates that the block is moving, 
        // we update its position based on speed, time and a vector
        if(this.isMoving)
        {
            this.transform.position += Vector3.left * this.speed * Time.deltaTime;
        }
    }
 
    // Method to set the speed, receives the value by parameter
    public SetSpeed(value: number)
    {
        this.speed = value;
    }

    // method to set the flag that indicates if the block is moving, it receives it by parameter
    public SetMoving(value:bool): void 
    {
        this.isMoving = value;
    }
    
    // Method to return the block to its respective BlockPool
    public ReturnToPool():void
    {
        // It is verified if there is a reference to its respective BlockPool
        if(this.blockPool != null)
        {
            // Before returning the block, the array of points of the block is traversed and its state is reset
            if(this.points != null && this.points.length > 0) {
                this.points.forEach(element => {
                    element.GetComponent<PointTargetRunner>().ResetPoint();
                });
            }
            
            // The block return method is called on the BlockPool passing itself by parameter
            this.blockPool.returnBlock(this.gameObject);
        }
        else
        {
            // If there is no reference to the BlockPool, this object is destroyed
            GameObject.Destroy(this.gameObject);
        }
    }

}