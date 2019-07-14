import { TestBed, ComponentFixture } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { By } from '@angular/platform-browser'
import { of } from 'rxjs'
import { ActivatedRoute } from '@angular/router'
import { Component, Input } from '@angular/core'

import { HeroDetailComponent } from './hero-detail.component'
import { HeroService } from '../hero.service'
import { Hero } from '../hero'
import { HEROES } from '../mock-heroes'
import { ActivatedRouteStub } from '../testing/activated-route-stub'

@Component({
  selector: 'agm-map',
  template: ''
})
class StubAgmMapComponent {
  @Input() latitude: number
  @Input() longitude: number
}

@Component({
  selector: 'agm-marker',
  template: ''
})
class StubAgmMarkerComponent {
  @Input() latitude: number
  @Input() longitude: number
}

describe('HeroDetailComponent', () => {
  let fixture: ComponentFixture<HeroDetailComponent>

  beforeEach(() => {
    const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHero'])
    const activatedRouteStub = new ActivatedRouteStub()

    TestBed.configureTestingModule({
      declarations: [
        HeroDetailComponent,
        StubAgmMapComponent,
        StubAgmMarkerComponent
      ],
      imports: [FormsModule, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    })
  })

  describe('when navigating to existing hero', () => {
    let expectedHero: Hero

    beforeEach(() => {
      expectedHero = HEROES[0]

      TestBed.get(HeroService).getHero.and.returnValue(of(expectedHero))
      TestBed.get(ActivatedRoute).setParamMap({ id: expectedHero.id })

      fixture = TestBed.createComponent(HeroDetailComponent)

      fixture.detectChanges()
    })

    it('should display that hero\'s name', () => {
      const h2 = fixture.debugElement.query(By.css('h2'))

      expect(h2).toBeTruthy()

      expect(h2.nativeElement.textContent).toContain(
        expectedHero.name.toUpperCase()
      )
    })
  })
})
