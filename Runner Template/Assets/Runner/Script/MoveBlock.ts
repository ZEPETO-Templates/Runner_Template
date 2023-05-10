import { Vector3, GameObject, Time } from "UnityEngine";
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import BlockPool from "./BlockPool";

export default class MoveBlock extends ZepetoScriptBehaviour 
{

    public blockPool: BlockPool;

    public speed: number;
    public isMoving: bool;

    public Awake(): void 
    {
        this.speed = 4;
        this.isMoving = false;
    }

    Update() 
    {
        if(this.isMoving)
        {
            this.transform.position += Vector3.left * this.speed * Time.deltaTime;
        }
    }

    public SetMoving(value:bool): void 
    {
        this.isMoving = value;
    }
    
    public ReturnToPool():void
    {
        if(this.blockPool != null)
        {
            this.blockPool.returnBlock(this.gameObject);
        }
        else
        {
            GameObject.Destroy(this.gameObject);
        }
    }

}