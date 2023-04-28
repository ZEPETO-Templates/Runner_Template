import { Collider, GameObject, Quaternion, Vector3, Debug } from 'UnityEngine';
import { ZepetoCharacter, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import GameOverManager from './GameOverManager';

export default class GameOverRunner extends ZepetoScriptBehaviour {
  private zepetoCharacter: ZepetoCharacter;

  Start() {
    // Listen for when a local player is added and assign the player's Zepeto character to the zepetoCharacter variable
    ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
      this.zepetoCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
    });
  }

  // OnTriggerEnter method is called when the object with this script collides with another object that has a Collider
  OnTriggerEnter(collider: Collider) {
    // Check if the colliding object has the "Player" tag
    if (collider.gameObject.tag == "Player") {
      Debug.Log("GameOver");
      // Show the Game Over screen through GameOverManager
      GameOverManager.getInstance().showGameOver();
    }
  }
}