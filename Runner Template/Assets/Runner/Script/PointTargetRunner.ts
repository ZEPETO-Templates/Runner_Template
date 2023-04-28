import { Collider, GameObject, ParticleSystem, Quaternion, Time, Vector3 } from 'UnityEngine';
import { ZepetoCharacter, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import PointsManager from './PointsManager';

export default class PointTargetRunner extends ZepetoScriptBehaviour {
  // The points value that the target will award
  public PointsValue: number = 10;
  // The GameObject that will hold the particle effect
  public ParticleSystem: GameObject;
  // The character controlled by the local player
  private zepetoCharacter: ZepetoCharacter;

  Start() {
    // Add a listener to know when a local player is added
    ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
      this.zepetoCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
    });
  }

  OnTriggerEnter(collider: Collider) {
    // Add the corresponding points to the PointsManager instance
    PointsManager.getInstance().ScorePoints(this.PointsValue);
    // Destroy the target
    GameObject.Destroy(this.gameObject);
    // Emit a particle effect
    this.ParticleSystem.GetComponent<ParticleSystem>().Emit(30);
  }
}
