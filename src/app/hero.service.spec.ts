import { TestBed } from '@angular/core/testing'

import { HeroService } from './hero.service'
import { MessageService } from './message.service'

describe('HeroService Manual Tests', () => {})

xdescribe('HeroService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provider: MessageService }]
    })
  )

  it('should be created', () => {
    const service: HeroService = TestBed.get(HeroService)
    expect(service).toBeTruthy()
  })
})
