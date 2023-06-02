import { Collider } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import LevelGenerator from '../Managers/LevelGenerator';

// This class detects collisions and is used both to generate new blocks and to remove them
export default class SpawnBlockLevel extends ZepetoScriptBehaviour 
{

    // https://docs.unity3d.com/ScriptReference/Collider.OnTriggerEnter.html
    OnTriggerEnter(collider: Collider) 
    {
        // In case of colliding with the player, the LevelGenerator is asked to generate a new block
        if(collider.CompareTag("Player"))
        {
            LevelGenerator.Instance.GenerateBlock();
        }
        
        // In case of colliding with the block at the end of the runner, the last block is removed
        if(collider.CompareTag("End"))
        {
            LevelGenerator.Instance.RemoveLastBlock();
        }
    }
    
}