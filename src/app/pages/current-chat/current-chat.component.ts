import {Component, Signal} from '@angular/core';
import {MessageService} from "../../services/message.service";
import {Conversation} from "../../models/conversation";

@Component({
  selector: 'app-current-chat',
  templateUrl: './current-chat.component.html',
  styleUrl: './current-chat.component.css'
})
export class CurrentChatComponent {

  currentConversation: Signal<Conversation|undefined>
  messageInput: string|undefined

  constructor(
    private readonly _messageService: MessageService
  ) {
    this.currentConversation = _messageService.currentConversation
  }

  sendMessage(){
    if(this.currentConversation() && this._messageService.currentUser && this.messageInput){
      let conv = this.currentConversation()!
      let currentUser = this._messageService.currentUser()!
      this._messageService.sendGroupMessage(conv.id,{username:currentUser,content:this.messageInput})
    }
  }
}
