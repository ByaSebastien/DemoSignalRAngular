import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './pages/chat/chat.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';
import { CurrentChatComponent } from './pages/current-chat/current-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ConversationListComponent,
    CurrentChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
