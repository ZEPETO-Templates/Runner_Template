import { Canvas, Debug, GameObject, Time,Transform } from 'UnityEngine';
import { Slider } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import EventsManager from './EventsManager';


export default class TimerManagerRunner extends ZepetoScriptBehaviour {

      private static instance: TimerManagerRunner;
   
   
    private _isRunning: boolean = false; // If timer is running
    
     private startTime: number;
    private currentTime: number;


     public static getInstance(): TimerManagerRunner {
        if (!TimerManagerRunner.instance) {
            TimerManagerRunner.instance = new TimerManagerRunner();
              return TimerManagerRunner.instance;
        }
        else{
            return this.instance;
        }
      
    }



    Start()
    {
        this.ResetTimer();
        this.StartTimer();
    }

    Update()
    {
      
    }

    public StartTimer()
    {
        this._isRunning = true;
       this.startTime= Time.time;
    }

    private StopTimer()
    {
        this._isRunning = false;
       
    }

    public ResetTimer()
    {
        this.currentTime = 0;
        this._isRunning = false;
    }

   

    /// <summary>
    /// Get Time Remaining
    /// </summary>
    public GetTime(): number
    {
    this.currentTime= Time.time - this.startTime;
        return this.currentTime;
    }

    /// <summary>
    /// Get if time is running
    /// </summary>
    public GetIsRunning(): boolean
    {
        return this._isRunning;
    }
}