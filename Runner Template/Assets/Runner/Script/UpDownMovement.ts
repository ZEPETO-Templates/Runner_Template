import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Vector3, MonoBehaviour, Time, Random } from 'UnityEngine';

export default class UpDownMovement  extends ZepetoScriptBehaviour {

   // Define the movement speed
  public maxSpeed: number = 1;
  public minSpeed: number = 4;
   public height: number = 1;

  // Define the maximum height and minimum height
  private maxHeight: number;
  private minHeight: number;
  private speed: number;
  // Define the direction of movement
  private moveUp: boolean = true;

  // Define the initial position
  private initialPosition: Vector3;

  Start() {
    // Get the initial position and calculate the maximum and minimum height
    this.initialPosition = this.transform.localPosition;
    this.maxHeight = this.initialPosition.y + this.height;
    this.minHeight = this.initialPosition.y;
    this.speed=Math.floor(Random.Range(this.minSpeed,this.maxSpeed)) as number;
  }

  Update() {
    // Calculate the new position
    let newPosition = this.transform.localPosition;
    if (this.moveUp) {
      newPosition.y += Time.deltaTime * this.speed;
      if (newPosition.y >= this.maxHeight) {
        newPosition.y = this.maxHeight;
        this.moveUp = false;
      }
    } else {
      newPosition.y -= Time.deltaTime * this.speed;
      if (newPosition.y <= this.minHeight) {
        newPosition.y = this.minHeight;
        this.moveUp = true;
      }
    }
    this.transform.localPosition = newPosition;
  }
}


