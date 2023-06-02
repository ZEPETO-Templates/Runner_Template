import { GameObject, Time } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

// This class manages game time
export default class TimerManagerRunner extends ZepetoScriptBehaviour 
{

    public static Instance: TimerManagerRunner; // This class instance
   
    private startTime: number; // Start time stamp
    private currentTime: number; // Current time

    // Awake is called when the script instance is being loaded
    public Awake(): void 
    {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // https://en.wikipedia.org/wiki/Singleton_pattern
        if (TimerManagerRunner.Instance == null) TimerManagerRunner.Instance = this;
        else GameObject.Destroy(this);
    }

    // Start is called on the frame when a script is enabled just before any of the Update methods is called the first time
    Start() 
    {
        this.ResetTimer();
        this.StartTimer();
    }

    // This method takes a timestamp and saves it in its respective variable
    public StartTimer() 
    {
        this.startTime = Time.time;
    }

    // This method resets the current time value
    public ResetTimer() 
    {
        this.currentTime = 0;
    }

    // This method returns the value of the time elapsed between the timestamp and this moment in milliseconds
    public GetTime(): number 
    {
        this.currentTime = Time.time - this.startTime;
        return this.currentTime;
    }

    // This method returns the same as GetTime with format
    public GetTimeFormated(): string
    {
        let time = this.GetTime() as number;
        let minutes = Math.floor(time / 59).toString() as string;
        let seconds = ((time % 59)).toFixed(0).padStart(2, '0') as string;

        return minutes + ':' + seconds;
    }
    
}