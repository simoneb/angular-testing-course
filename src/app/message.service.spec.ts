import { TestBed, inject } from '@angular/core/testing'

import { MessageService } from './message.service'

describe('MessageService simple tests', () => {
  let service: MessageService

  beforeEach(() => {
    service = new MessageService()
  })

  it('should not have any messages', () => {
    expect(service.messages.length).toBe(0)
  })

  it('should add a message', () => {
    const message = 'hello testing world!'

    service.add(message)

    expect(service.messages.length).toBe(1)
    expect(service.messages).toEqual([message])
  })

  it('should clear messages', () => {
    service.add('a random message')
    service.clear()

    expect(service.messages.length).toBe(0)
  })

  it('should add async', async () => {
    const message = 'an async message'
    expectAsync(service.addWithDelay(message)).toBeResolvedTo(message)
  })
})

describe('MessageService tests using TestBed', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({})
  })

  it('should be created via the TestBed', () => {
    const service = TestBed.get(MessageService)

    expect(service).toBeTruthy()
  })

  it('should add a message')

  it('should clear messages')
})
