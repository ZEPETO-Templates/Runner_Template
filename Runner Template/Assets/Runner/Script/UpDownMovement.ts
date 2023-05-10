import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Vector3, Time, Random } from 'UnityEngine';

export default class UpDownMovement  extends ZepetoScriptBehaviour 
{

    public maxSpeed: number = 1;
    public minSpeed: number = 4;
    public height: number = 1;

    private _maxHeight: number;
    private _minHeight: number;
    private _speed: number;

    private _moveUp: boolean = true;

    private _initialPosition: Vector3;

    Start() 
    {
        this._initialPosition = this.transform.localPosition;
        this._maxHeight = this._initialPosition.y + this.height;
        this._minHeight = this._initialPosition.y;
        this._speed=Math.floor(Random.Range(this.minSpeed,this.maxSpeed)) as number;
    }

    Update() 
    {
        let newPosition = this.transform.localPosition;
        if (this._moveUp) 
        {
            newPosition.y += Time.deltaTime * this._speed;
            if (newPosition.y >= this._maxHeight) 
            {
                newPosition.y = this._maxHeight;
                this._moveUp = false;
            }
        }
        else 
        {
            newPosition.y -= Time.deltaTime * this._speed;
            if (newPosition.y <= this._minHeight) 
            {
                newPosition.y = this._minHeight;
                this._moveUp = true;
            }
        }
        this.transform.localPosition = newPosition;
    }
  
}