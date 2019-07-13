import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { MessagesComponent } from './messages.component'
import { By } from '@angular/platform-browser'
import { MessageService } from '../message.service'

describe('MessagesComponent with real dependencies', () => {
  let component: MessagesComponent
  let fixture: ComponentFixture<MessagesComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessagesComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })

  it('should not display anything via nativeElement', () => {
    const h2 = fixture.nativeElement.querySelector('h2')

    expect(h2).toBeFalsy()
  })

  it('should not display anything via debugElement', () => {
    const h2 = fixture.debugElement.query(By.css('h2'))

    expect(h2).toBeFalsy()
  })

  it('should display title via nativeElement when there are messages', () => {
    const messageService = TestBed.get(MessageService)

    messageService.add('message')

    // IMPORTANT!
    fixture.detectChanges()

    const h2 = fixture.nativeElement.querySelector('h2')

    expect(h2).toBeTruthy()
    expect(h2.textContent).toBe('Messages')
  })

  it('should display title via debugElement when there are messages', () => {
    const messageService = TestBed.get(MessageService)

    messageService.add('message')

    // IMPORTANT
    fixture.detectChanges()

    const h2 = fixture.debugElement.query(By.css('h2'))

    expect(h2).toBeTruthy()
    expect(h2.nativeElement.textContent).toBe('Messages')
  })

  it('should display message when there are messages', () => {
    const messageText = 'hello testing world'
    const messageService = TestBed.get(MessageService)

    messageService.add(messageText)

    // IMPORTANT
    fixture.detectChanges()

    const messageDiv = fixture.debugElement
      .query(By.css('div'))
      .children.find(By.css('div'))

    expect(messageDiv).toBeTruthy()
    expect(messageDiv.nativeElement.textContent).toBe(messageText)
  })

  it('should display 2 messages')

  it('should clear messages', () => {
    const messageService = TestBed.get(MessageService)

    messageService.add('message')

    fixture.detectChanges()

    const clearButton = fixture.debugElement.query(By.css('button'))

    expect(clearButton).toBeTruthy()

    clearButton.nativeElement.dispatchEvent(new Event('click'))

    fixture.detectChanges()

    const h2 = fixture.debugElement.query(By.css('h2'))

    expect(h2).toBeFalsy()
  })
})

describe('MessagesComponent with dependency doubles', () => {
  let component: MessagesComponent
  let fixture: ComponentFixture<MessagesComponent>

  beforeEach(async(() => {
    const messageServiceSpy = {
      clear: jasmine.createSpy('clear'),
      messages: ['hello testing world']
    }

    TestBed.configureTestingModule({
      declarations: [MessagesComponent],
      providers: [
        {
          provide: MessageService,
          useValue: messageServiceSpy
        }
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should proxy clear event to MessageService', () => {
    const messageServiceSpy = TestBed.get(MessageService)

    const clearButton = fixture.debugElement.query(By.css('button'))
    clearButton.nativeElement.dispatchEvent(new Event('click'))

    expect(messageServiceSpy.clear).toHaveBeenCalled()
  })
})
