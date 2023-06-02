import { Collider } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import GameManagerRunner from '../Managers/GameManagerRunner';

// This class is in charge of detecting the collision with the player
// And to finish the game, it is intended to be used as a component in the obstacles
export default class GameOverCollision extends ZepetoScriptBehaviour 
{

    // https://docs.unity3d.com/ScriptReference/Collider.OnTriggerEnter.html
    OnTriggerEnter(collider: Collider) 
    {
        // Player tag check
        if (collider.gameObject.tag == "Player") 
        {
            // Called the game manager to end the game
            // The call is made via the static instance of the singleton
            GameManagerRunner.Instance.OnGameOver();
        }
    }
  
}