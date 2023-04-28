import { Action } from 'System';
import { Debug } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class EventsManager extends ZepetoScriptBehaviour {

    public OnGameOver: Action;

    private static instance: EventsManager;

    public static getInstance(): EventsManager {
        if (!EventsManager.instance) {
            EventsManager.instance = new EventsManager();
        }

        return EventsManager.instance;
    }

    public SomeMethod(): void
    {
        Debug.Log("Hello, I am a singleton instance!");
    }

}