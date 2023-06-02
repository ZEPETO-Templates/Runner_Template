import { Collider, Debug, GameObject, ParticleSystem } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import ScoreManager from '../Managers/ScoreManager';

// This class controls the behavior of points or coins in the game
export default class PointTargetRunner extends ZepetoScriptBehaviour 
{

    public particleSystem: GameObject; // Reference to the particle system of the element
    private _pointsValue: number; // Internal value of the element

    // Awake is called when the script instance is being loaded
    public Awake(): void 
    {
        // Assigning a default value to the element
        this._pointsValue = 10;
    }

    // This method handles the reset of the element itself.
    public ResetPoint()
    {
        // This object is reassigned as the parent of the particle system
        this.particleSystem.transform.parent = this.transform;
        //this.particleSystem.transform.position = this.transform.position;
        this.gameObject.SetActive(true);
    }

    // https://docs.unity3d.com/ScriptReference/Collider.OnTriggerEnter.html
    OnTriggerEnter(collider: Collider) 
    {
        // We verify that the collision is with the player by comparing his tag
        if(collider.CompareTag("Player"))
        {
            // We ask the ScoreManager to add the value of this point
            ScoreManager.Instance.ScorePoints(this._pointsValue);

            // We remove the particle system as a child of this object and leave it outside, 
            // this is so because the active element will be deactivated in the next lines
            this.particleSystem.transform.parent = this.transform.parent;

            // We notify the particle system to emit
            this.particleSystem.GetComponent<ParticleSystem>().Emit(30);

            // We deactivate the current element
            this.gameObject.SetActive(false);
        }
    }
  
}