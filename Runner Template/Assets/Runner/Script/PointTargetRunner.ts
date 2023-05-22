import { Collider, Debug, GameObject, ParticleSystem } from 'UnityEngine';
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

    public ResetPoint()
    {
        this.particleSystem.transform.parent = this.transform;
        //this.particleSystem.transform.position = this.transform.position;
        this.gameObject.SetActive(true);
    }

    OnTriggerEnter(collider: Collider) 
    {
        ScoreManager.Instance.ScorePoints(this._pointsValue);

        this.particleSystem.transform.parent = this.transform.parent;
        //this.particleSystem.transform.position = this.transform.position;

        this.particleSystem.GetComponent<ParticleSystem>().Emit(30);

        this.gameObject.SetActive(false);
    }
  
}