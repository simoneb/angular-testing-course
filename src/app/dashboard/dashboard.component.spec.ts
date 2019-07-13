import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import { RouterTestingModule } from '@angular/router/testing'
import { By } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { DashboardComponent } from './dashboard.component'
import { HeroSearchComponent } from '../hero-search/hero-search.component'
import { HEROES } from '../mock-heroes'
import { HeroService } from '../hero.service'
import { DashboardHeroComponent } from '../dashboard-hero/dashboard-hero.component'
import { click } from '../testing/click'

describe('DashboardComponent', () => {
  let component: DashboardComponent
  let fixture: ComponentFixture<DashboardComponent>
  let getHeroesSpy

  beforeEach(async(() => {
    const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes'])
    getHeroesSpy = heroServiceSpy.getHeroes.and.returnValue(of(HEROES))

    const routerSpy = jasmine.createSpyObj('Router', ['navigate'])

    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        HeroSearchComponent,
        DashboardHeroComponent
      ],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: HeroService,
          useValue: heroServiceSpy
        },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent)
    component = fixture.componentInstance

    fixture.detectChanges()
  })

  it('should call heroService', async(() => {
    expect(getHeroesSpy).toHaveBeenCalled()
  }))

  it('should display 4 children dashboard hero components', async(() => {
    expect(
      fixture.debugElement.queryAll(By.css('app-dashboard-hero')).length
    ).toEqual(4)
  }))

  it('should tell Router to navigate when hero clicked', () => {
    const firstHeroElement = fixture.debugElement.query(By.css('.hero'))
    const routerSpy = TestBed.get(Router)

    click(firstHeroElement)

    expect(routerSpy.navigate).toHaveBeenCalledWith([
      'detail',
      firstHeroElement.componentInstance.hero.id
    ])
  })
})
