import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { By } from '@angular/platform-browser'
import { of } from 'rxjs'
import { cold, getTestScheduler } from 'jasmine-marbles'

import { HeroesComponent } from './heroes.component'
import { HEROES } from '../mock-heroes'
import { HeroService } from '../hero.service'
import { asyncData } from '../testing/async-helpers'

describe('HeroesComponent Class behavior', () => {
  let heroServiceSpy: { getHeroes: jasmine.Spy }
  let component: HeroesComponent

  beforeEach(() => {
    heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes'])

    component = new HeroesComponent(heroServiceSpy as any)
  })

  it('should call HeroService getHeroes on ngOnInit', () => {
    heroServiceSpy.getHeroes.and.returnValue(asyncData(HEROES))

    component.ngOnInit()

    expect(heroServiceSpy.getHeroes).toHaveBeenCalled()
  })
})

describe('HeroesComponent Class behavior via TestBed', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroesComponent,
        {
          provide: HeroService,
          useValue: jasmine.createSpyObj('HeroService', ['addHero'])
        }
      ]
    })
  })

  it('should call HeroService add when adding a new hero', () => {
    const heroServiceSpy = TestBed.get(HeroService)
    const component = TestBed.get(HeroesComponent)

    const heroName = 'hercules'

    heroServiceSpy.addHero.and.callFake(hero =>
      asyncData({ id: 1000, ...hero })
    )

    component.heroes = []
    component.add(heroName)

    expect(heroServiceSpy.addHero).toHaveBeenCalledWith({ name: heroName })
  })

  /**
   * 1) trigger hero deletion
   * 2) assert that internal list is updates
   * 3) assert that hero service has been called
   */
  it('should delete a hero')

  // fakeAsync preview (introduced later)
  it('should add returned hero to the internal list', fakeAsync(() => {
    const heroServiceSpy = TestBed.get(HeroService)
    const component = TestBed.get(HeroesComponent)

    const heroName = 'hercules'

    heroServiceSpy.addHero.and.callFake(hero =>
      asyncData({ id: 1000, ...hero })
    )

    component.heroes = []
    component.add(heroName)

    tick()

    expect(component.heroes).toEqual([{ id: 1000, name: heroName }])
  }))
})

describe('HeroesComponent DOM Testing', () => {
  let component: HeroesComponent
  let fixture: ComponentFixture<HeroesComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: HeroService,
          useValue: jasmine.createSpyObj('HeroService', ['getHeroes'])
        }
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent)
    component = fixture.componentInstance
  })

  it('should call HeroService on init', () => {
    const heroServiceSpy = TestBed.get(HeroService)

    heroServiceSpy.getHeroes.and.returnValue(of(HEROES))

    fixture.detectChanges()

    expect(heroServiceSpy.getHeroes).toHaveBeenCalled()
  })

  it('should assign getHeroes return value to local variable on init with synchronous behavior', () => {
    const heroServiceSpy = TestBed.get(HeroService)

    heroServiceSpy.getHeroes.and.returnValue(of(HEROES))

    fixture.detectChanges()

    expect(component.heroes).toEqual(HEROES)
  })

  it('should assign getHeroes return value to local variable on init with asynchronous behavior', fakeAsync(() => {
    const heroServiceSpy = TestBed.get(HeroService)

    heroServiceSpy.getHeroes.and.returnValue(asyncData(HEROES))

    fixture.detectChanges()

    tick()

    expect(component.heroes).toEqual(HEROES)
  }))

  it('should render heroes with asynchronous behavior', fakeAsync(() => {
    const heroServiceSpy = TestBed.get(HeroService)

    heroServiceSpy.getHeroes.and.returnValue(asyncData(HEROES))

    // ngOnInit
    fixture.detectChanges()

    tick()

    // update view with heroes
    fixture.detectChanges()

    const heroesItems = fixture.debugElement.queryAll(By.css('li'))

    expect(heroesItems.length).toBe(HEROES.length)
  }))

  it('should render heroes with marbles', () => {
    const heroServiceSpy = TestBed.get(HeroService)

    // docs: https://angular.io/guide/testing#marble-frame
    const q$ = cold('---x|', { x: HEROES })
    heroServiceSpy.getHeroes.and.returnValue(q$)

    // ngOnInit()
    fixture.detectChanges()

    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(0)

    getTestScheduler().flush()

    // update view with heroes
    fixture.detectChanges()

    const heroesItems = fixture.debugElement.queryAll(By.css('li'))

    expect(heroesItems.length).toBe(HEROES.length)
  })

  /**
   * 1) render heroes
   * 2) assert that the first hero in the DOM is the first hero returned by hero service
   */
  it(
    'should render the first hero returned by hero service as the first item of the list'
  )
})
