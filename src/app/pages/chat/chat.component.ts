import {Component, Signal} from '@angular/core';
import {MessageService} from "../../services/message.service";
import {Message} from "../../models/message";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  message$ : Signal<Message[]>;
  messageForm!: FormGroup;

  constructor(
    private readonly _messageService: MessageService,
    private readonly _fb: FormBuilder
  ) {
    this.message$ = _messageService.allMessage
    this.messageForm = this._fb.group({
      username: [null,Validators.required],
      content: [null,Validators.required]
    })
  }

  sendMessage(){
    if(this.messageForm.valid){
      this._messageService.sendMessage(this.messageForm.value);
    }
  }
}
