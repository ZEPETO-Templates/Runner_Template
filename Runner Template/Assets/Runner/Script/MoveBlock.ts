import { Vector3, GameObject, Time } from "UnityEngine";
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import BlockPool from "./BlockPool";
import PointTargetRunner from "./PointTargetRunner";

export default class MoveBlock extends ZepetoScriptBehaviour 
{

    public blockPool: BlockPool;
    public difficultyLevel: number;

    public speed: number;
    public isMoving: bool;

    public points: GameObject[];

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

    public SetSpeed(value: number)
    {
        this.speed = value;
    }

    public SetMoving(value:bool): void 
    {
        this.isMoving = value;
    }
    
    public ReturnToPool():void
    {
        if(this.blockPool != null)
        {
            if(this.points != null && this.points.length > 0) {
                this.points.forEach(element => {
                    element.GetComponent<PointTargetRunner>().ResetPoint();
                });
            }
            
            this.blockPool.returnBlock(this.gameObject);
        }
        else
        {
            GameObject.Destroy(this.gameObject);
        }
    }

}