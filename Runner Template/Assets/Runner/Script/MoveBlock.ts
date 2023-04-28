import { Vector3, GameObject, Time} from "UnityEngine";
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class MoveBlock extends ZepetoScriptBehaviour {
  public speed: number = 4; // velocidad de movimiento en el eje X

  Update() {
    // actualiza la posición en el eje X para mover el objeto hacia la izquierda
    this.transform.position += Vector3.left * this.speed * Time.deltaTime;
  }
}
