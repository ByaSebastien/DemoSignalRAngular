import {Component, Signal} from '@angular/core';
import {MessageService} from "./services/message.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'untitled';
  username: string|undefined
  currentUser: Signal<string|undefined>

  constructor(
    private readonly _messageService: MessageService
  ) {
    this.currentUser = _messageService.currentUser;
  }

  setCurrentUser(){
    if(this.username){
      this._messageService.setCurrentUser(this.username);
    }
  }
}
