import { GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import AudioManager from './AudioManager';

export default class ScoreManager extends ZepetoScriptBehaviour 
{

    public static Instance: ScoreManager;
    private _Points: number;

    public Awake(): void 
    {
        if (ScoreManager.Instance == null) ScoreManager.Instance = this;
        else GameObject.Destroy(this);

        this._Points = 0;
    }

    public ScorePoints(points: number): void 
    {
        AudioManager.Instance.PlayCoinSound();
        this._Points += points;
    }

    public GetPoints(): number 
    {
        return this._Points;
    }

    public ResetPoints(): void 
    {
        this._Points=0;
    } 
  
}