import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { SpawnInfo, ZepetoPlayers, LocalPlayer, CharacterInfo, ZepetoPlayer } from 'ZEPETO.Character.Controller';
import { WorldService } from 'ZEPETO.World';
import { Button } from 'UnityEngine.UI';
import { GameObject } from 'UnityEngine';

export default class CharacterController extends ZepetoScriptBehaviour {


  public startButton: Button;   
 

    Start() {
     

       //this.startButton.onClick.AddListener(this.SpawnCharacter);

       this.SpawnCharacter();

    }

  public  SpawnCharacter():void{
   ZepetoPlayers.instance.CreatePlayerWithUserId(WorldService.userId, new SpawnInfo(), true);
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            let _player : LocalPlayer = ZepetoPlayers.instance.LocalPlayer;
        });

       
  }
}