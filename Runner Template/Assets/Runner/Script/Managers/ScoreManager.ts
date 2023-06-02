import { GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import AudioManager from './AudioManager';

// This class manages the score
export default class ScoreManager extends ZepetoScriptBehaviour 
{

    public static Instance: ScoreManager; // This class instance
    private _Points: number; // Internal value of accumulated points

    // Awake is called when the script instance is being loaded
    public Awake(): void 
    {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // https://en.wikipedia.org/wiki/Singleton_pattern
        if (ScoreManager.Instance == null) ScoreManager.Instance = this;
        else GameObject.Destroy(this);

        // We set the initial value of points to 0
        this._Points = 0;
    }

    // This method is called when the player scores a point
    public ScorePoints(points: number): void 
    {
        // We verify that the AudioManager is not null
        if(AudioManager.Instance != null)
        {
            // We tell the AudioManager to emit a sound
            AudioManager.Instance.PlayCoinSound();
        }

        // Add the value of the point passed by parameter to the internal total value
        this._Points += points;
    }

    // This method returns the internal value of the accumulated points
    public GetPoints(): number 
    {
        return this._Points as number;
    }

    // This method resets the internal value of the accumulated points to 0
    public ResetPoints(): void 
    {
        this._Points = 0;
    } 
  
}