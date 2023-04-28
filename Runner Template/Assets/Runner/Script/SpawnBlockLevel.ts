import { Collider, GameObject, Vector3, MonoBehaviour, Debug } from 'UnityEngine';
import { ZepetoCharacter, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';

// Import the LevelGenerator class
import LevelGenerator from './LevelGenerator';

// Define SpawnBlockLevel class that extends ZepetoScriptBehaviour
export default class SpawnBlockLevel extends ZepetoScriptBehaviour {

// Define the level property as an instance of LevelGenerator
public level: LevelGenerator;

Start() {
// Get the instance of LevelGenerator
this.level = LevelGenerator.getInstance();
}

// Called when the collider enters into contact with another collider
OnTriggerEnter(collider: Collider) {
// Generate a new block of level
if(this.level!=null)
this.level.GenerateBlock();
// Delete the block after 5 seconds
setTimeout(() => this.DeleteBlock(), 2000);
}

// Delete the current block
DeleteBlock() {
 if (this.gameObject.transform.parent.gameObject!= null) 
GameObject.Destroy(this.gameObject.transform.parent.gameObject);
}
}