import { AudioClip, AudioSource, GameObject } from 'UnityEngine'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class AudioManager extends ZepetoScriptBehaviour 
{
    
    public static Instance: AudioManager;
    
    public generalAudioSource: AudioSource;
    public coinFX: AudioClip;
    
    public Awake(): void 
    {
        if (AudioManager.Instance == null) AudioManager.Instance = this;
        else GameObject.Destroy(this);
    }
    
    // Simple implementation of triggering a sound
    public PlayCoinSound()
    {
        this.generalAudioSource.PlayOneShot(this.coinFX);
    }
}