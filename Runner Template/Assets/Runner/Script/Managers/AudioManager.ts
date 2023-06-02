import { AudioClip, AudioSource, GameObject } from 'UnityEngine'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

// This class is responsible for managing the use of audio resources
export default class AudioManager extends ZepetoScriptBehaviour 
{
    
    public static Instance: AudioManager; // This class instance
    
    public generalAudioSource: AudioSource; // General Game AudioSource Reference
    public coinFX: AudioClip; // Audio clip sound effect
    
    // Awake is called when the script instance is being loaded
    public Awake(): void 
    {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // https://en.wikipedia.org/wiki/Singleton_pattern
        if (AudioManager.Instance == null) AudioManager.Instance = this;
        else GameObject.Destroy(this);
    }
    
    // Simple implementation of triggering a sound
    public PlayCoinSound()
    {
        // The triggering of the sound is done by passing the AudioClip to the AudioSource as a parameter through the "PlayOneShot" method.
        this.generalAudioSource.PlayOneShot(this.coinFX);
    }
}