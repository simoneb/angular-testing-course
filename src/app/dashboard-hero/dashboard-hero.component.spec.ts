import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'

import { DashboardHeroComponent } from './dashboard-hero.component'
import { Hero } from '../hero'
import { click } from '../testing/click'

describe('DashboardHeroComponent', () => {
  let component: DashboardHeroComponent
  let fixture: ComponentFixture<DashboardHeroComponent>
  let heroDebugElement: DebugElement
  let heroElement: HTMLElement

  const expectedHero = { id: 42, name: 'hercules' }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardHeroComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHeroComponent)
    component = fixture.componentInstance

    heroDebugElement = fixture.debugElement.query(By.css('.hero'))
    heroElement = fixture.nativeElement.querySelector('.hero')

    component.hero = expectedHero

    fixture.detectChanges()
  })

  it('should display hero name', () => {
    expect(heroElement.textContent).toContain(expectedHero.name)
  })

  it('should raise selected event when clicked (triggerEventHandler)', () => {
    let selectedHero: Hero
    component.selected.subscribe((h: Hero) => (selectedHero = h))

    heroDebugElement.triggerEventHandler('click', null)

    expect(selectedHero).toBe(expectedHero)
  })

  it('should raise selected event when clicked (element.click)', () => {
    let selectedHero: Hero
    component.selected.subscribe((h: Hero) => (selectedHero = h))

    heroElement.click()

    expect(selectedHero).toBe(expectedHero)
  })

  it('should raise selected event when clicked (click helper)', () => {
    let selectedHero: Hero
    component.selected.subscribe((hero: Hero) => (selectedHero = hero))

    click(heroDebugElement) // click helper with DebugElement
    click(heroElement) // click helper with native element

    expect(selectedHero).toBe(expectedHero)
  })
})
