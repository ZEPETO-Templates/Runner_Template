import { Collider } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import LevelGenerator from './LevelGenerator';

export default class SpawnBlockLevel extends ZepetoScriptBehaviour 
{

    OnTriggerEnter(collider: Collider) 
    {
        if(collider.CompareTag("Player"))
        {
            LevelGenerator.Instance.GenerateBlock();
        }
        
        if(collider.CompareTag("End"))
        {
            LevelGenerator.Instance.RemoveLastBlock();
        }
    }
    
}