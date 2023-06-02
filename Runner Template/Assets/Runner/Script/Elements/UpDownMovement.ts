import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Vector3, Time, Random } from 'UnityEngine';

// This class adjusts the movement of an element
export default class UpDownMovement  extends ZepetoScriptBehaviour 
{

    public maxSpeed: number = 1; // Maximum speed limit
    public minSpeed: number = 4; // Minimum Speed ​​Limit
    public height: number = 1; // Height to go

    private _maxHeight: number; // maximum height
    private _minHeight: number; // Minimun height
    private _speed: number; // Current speed

    private _moveUp: boolean = true; // Flag that indicates if the element is moving up

    private _initialPosition: Vector3; // Initial position reference

    // Start is called on the frame when a script is enabled just before any of the Update methods is called the first time
    Start() 
    {
        // The initial position reference is saved
        this._initialPosition = this.transform.localPosition;

        //The maximum height limit is defined as the current position plus the height to go
        this._maxHeight = this._initialPosition.y + this.height;

        // The minimum is the same initial position in Y
        this._minHeight = this._initialPosition.y;

        // Finally, the speed is defined as a random value between the maximum and the minimum previously defined
        this._speed = Math.floor(Random.Range(this.minSpeed,this.maxSpeed)) as number;
    }

    // Update is called every frame, if the MonoBehaviour is enabled
    Update() 
    {
        // We create a temporary vector3 that we are going to manipulate
        let newPosition = this.transform.localPosition;

        // Depending on the flag that indicates the direction, 
        // we increase or decrease the Y component of the vector
        if (this._moveUp) 
        {
            // The increment is made by multiplying the time by the defined speed
            newPosition.y += Time.deltaTime * this._speed;

            // If the new position in Y exceeds the maximum limit, we invert the movement flag
            if (newPosition.y >= this._maxHeight) 
            {
                newPosition.y = this._maxHeight;
                this._moveUp = false;
            }
        }
        else 
        {
            // The decrease is made by multiplying the time by the defined speed
            newPosition.y -= Time.deltaTime * this._speed;

            // If the new position in Y is less than the minimum limit, we invert the movement flag
            if (newPosition.y <= this._minHeight) 
            {
                newPosition.y = this._minHeight;
                this._moveUp = true;
            }
        }

        // Finally we assign the time vector as the value of the position of the element that has this component
        this.transform.localPosition = newPosition;
    }
  
}