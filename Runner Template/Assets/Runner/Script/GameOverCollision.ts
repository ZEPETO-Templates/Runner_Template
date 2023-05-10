import { Collider } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import GameManagerRunner from './GameManagerRunner';

export default class GameOverCollision extends ZepetoScriptBehaviour 
{

    OnTriggerEnter(collider: Collider) 
    {
        if (collider.gameObject.tag == "Player") 
        {
            GameManagerRunner.Instance.OnGameOver();
        }
    }
  
}