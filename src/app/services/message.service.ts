import {Injectable, signal, WritableSignal} from '@angular/core';
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {Message} from "../models/message";
import {Conversation} from "../models/conversation";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private _currentUser$: WritableSignal<string|undefined> = signal<string|undefined>(undefined)
  private _allMessage$: WritableSignal<Message[]> = signal<Message[]>([])
  private _allConversation$: WritableSignal<Conversation[]> = signal<Conversation[]>([])
  private _currentConversation$: WritableSignal<Conversation|undefined> = signal<Conversation|undefined>(undefined)

  connection: HubConnection;

  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5105/ws/chat")
      .build();
    this.connection.start()
      .then(() => {
          this.connection.on("allMessage",(messages:Message[]) => {
            this._allMessage$.set(messages);
          })
          this.connection.on("allConversation",(conversations: Conversation[]) => {
            this._allConversation$.set(conversations);
          })
          this.connection.on("currentConversation",(conversation: Conversation) => {
            this._currentConversation$.set(conversation);
            console.log(conversation)
          })
      })
  }

  public get allMessage(){
    return this._allMessage$.asReadonly();
  }

  public get allConversation(){
    return this._allConversation$.asReadonly();
  }

  public get currentConversation(){
    return this._currentConversation$.asReadonly();
  }

  public get currentUser(){
    return this._currentUser$.asReadonly();
  }

  public setCurrentUser(username: string){
    this._currentUser$.set(username);
  }

  public sendMessage(message: Message){
    this.connection.send("SendMessage",message);
  }

  public createConv(newConv:any){
    this.connection.send("CreateConversation",newConv)
  }

  public joinConv(conversationId:string){
    if(this.currentUser()){
      this.connection.send("JoinConversation",conversationId,this.currentUser())
    }
  }

  public sendGroupMessage(conversationId: string, message: Message){
    this.connection.send("sendGroupMessage",conversationId,message);
  }
}
