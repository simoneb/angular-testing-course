import { Component, OnInit } from '@angular/core'

import { MessageService } from '../message.service'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  cleared = false

  constructor(public messageService: MessageService) {}

  clear() {
    this.messageService.clear()
    this.cleared = true
  }
}
