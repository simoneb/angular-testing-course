import { TestBed } from '@angular/core/testing'
import { HttpClient } from '@angular/common/http'
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'

import { HeroService } from './hero.service'
import { MessageService } from './message.service'
import { asyncData } from './testing/async-helpers'
import { HEROES } from './mock-heroes'

describe('HeroService manual injection tests', () => {
  let service: HeroService
  let httpClientSpy: { get: jasmine.Spy }

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'])

    service = new HeroService(httpClientSpy as any, new MessageService())
  })

  it('should get heroes', done => {
    httpClientSpy.get.and.returnValue(asyncData(HEROES))

    service.getHeroes().subscribe(heroes => {
      expect(heroes).toEqual(HEROES)
      done()
    }, fail)

    expect(httpClientSpy.get).toHaveBeenCalledWith('api/heroes')
  })
})

describe('HeroService with Test Bed and manual Http mocking', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: jasmine.createSpyObj('HttpClient', ['get'])
        }
      ]
    })
  })

  it('should get heroes', done => {
    const service = TestBed.get(HeroService)
    const httpClientSpy = TestBed.get(HttpClient)

    httpClientSpy.get.and.returnValue(asyncData(HEROES))

    service.getHeroes().subscribe(heroes => {
      expect(heroes).toEqual(HEROES)
      done()
    }, fail)

    expect(httpClientSpy.get).toHaveBeenCalledWith('api/heroes')
  })
})

describe('HeroService Test Bed and Auto Http Mocking', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  })

  it('should get heroes', done => {
    const service = TestBed.get(HeroService)
    const httpTestingController = TestBed.get(HttpTestingController)

    service.getHeroes().subscribe(heroes => {
      expect(heroes).toEqual(HEROES)
      done()
    }, fail)

    const req = httpTestingController.expectOne('api/heroes')

    expect(req.request.method).toBe('GET')

    req.flush(HEROES)

    httpTestingController.verify()
  })

  // Exercise!
  it('should log message when getting heroes')
})
