import { GameObject, Time } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameManagerRunner from './GameManagerRunner';

export default class TimerManagerRunner extends ZepetoScriptBehaviour 
{

    public static Instance: TimerManagerRunner;
   
    private startTime: number;
    private currentTime: number;

    public Awake(): void 
    {
      if (TimerManagerRunner.Instance == null) TimerManagerRunner.Instance = this;
      else GameObject.Destroy(this);
    }

    Start() 
    {
        this.ResetTimer();
        this.StartTimer();
    }

    public StartTimer() 
    {
        this.startTime = Time.time;
    }

    public ResetTimer() 
    {
        this.currentTime = 0;
    }

    public GetTime(): number 
    {
        this.currentTime = Time.time - this.startTime;
        return this.currentTime;
    }

    public GetTimeFormated(): string
    {
        let time = TimerManagerRunner.Instance.GetTime() as number;
        let minutes = Math.floor(time / 60000).toString() as string;
        let seconds = ((time % 60000)).toFixed(0).padStart(2, '0') as string;

        return minutes + ':' + seconds;
    }
    
    public GetSeconds() : number
    {
        return 
    }
    
}