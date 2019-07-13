import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: string[] = []

  add(message: string) {
    this.messages.push(message)
  }

  clear() {
    this.messages = []
  }

  addWithDelay(message: string, delay: number = 1000) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.add(message)
        resolve(message)
      }, delay)
    })
  }
}
