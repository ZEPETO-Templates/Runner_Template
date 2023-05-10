import { Collider, GameObject, ParticleSystem } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import ScoreManager from './ScoreManager';

export default class PointTargetRunner extends ZepetoScriptBehaviour 
{

    public particleSystem: GameObject;
    private _pointsValue: number;

    public Awake(): void 
    {
        this._pointsValue = 10;
    }

    OnTriggerEnter(collider: Collider) 
    {
        ScoreManager.Instance.ScorePoints(this._pointsValue);
        this.particleSystem.GetComponent<ParticleSystem>().Emit(30);
        GameObject.Destroy(this.gameObject);
    }
  
}