import {Component, Signal} from '@angular/core';
import {MessageService} from "../../services/message.service";
import {Conversation} from "../../models/conversation";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrl: './conversation-list.component.css'
})
export class ConversationListComponent {

  conversations$: Signal<Conversation[]>;
  convForm: FormGroup;

  constructor(
    private readonly _messageService: MessageService,
    private readonly _fb: FormBuilder
  ) {
    this.conversations$ = _messageService.allConversation;
    this.convForm = this._fb.group({
      name: [null, Validators.required]
    })
  }

  createConv() {
    if (this._messageService.currentUser()) {
      let form = {
        name: this.convForm.get('name')?.value,
        username: this._messageService.currentUser()
      };
      this._messageService.createConv(form);
    }
  }

  joinConv(id: string) {
    if (this._messageService.currentUser()) {
      this._messageService.joinConv(id);
    }
  }
}
