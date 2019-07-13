import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { Component, NO_ERRORS_SCHEMA } from '@angular/core'

import { AppComponent } from './app.component'
import { RouterLinkStubDirective } from './testing/router-link-stub.directive'

@Component({
  selector: 'app-messages',
  template: ''
})
class StubMessageComponent {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        StubMessageComponent,
        RouterLinkStubDirective
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(AppComponent)
  }))

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  })

  it(`should have as title 'angular-testing-course'`, () => {
    const app = fixture.debugElement.componentInstance
    expect(app.title).toEqual('Angular Testing Course')
  })

  it('should render title in a h1 tag', () => {
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    expect(compiled.querySelector('h1').textContent).toContain(
      'Angular Testing Course'
    )
  })

  it('can get RouterLinks from template', () => {
    const linkDebugElements = fixture.debugElement.queryAll(
      By.directive(RouterLinkStubDirective)
    )

    const routerLinks = linkDebugElements.map((de) =>
      de.injector.get(RouterLinkStubDirective)
    )

    fixture.detectChanges()

    expect(routerLinks.length).toBe(2, 'should have 2 routerLinks')
    expect(routerLinks[0].linkParams).toBe('/dashboard')
    expect(routerLinks[1].linkParams).toBe('/heroes')
  })

  it('can click Heroes link in template', () => {
    const linkDebugElements = fixture.debugElement.queryAll(
      By.directive(RouterLinkStubDirective)
    )

    const routerLinks = linkDebugElements.map((de) =>
      de.injector.get(RouterLinkStubDirective)
    )

    fixture.detectChanges()

    const heroesLinkDe = linkDebugElements[1] // heroes link DebugElement
    const heroesLink = routerLinks[1] // heroes link directive

    expect(heroesLink.navigatedTo).toBeNull('should not have navigated yet')

    heroesLinkDe.triggerEventHandler('click', null)

    fixture.detectChanges()

    expect(heroesLink.navigatedTo).toBe('/heroes')
  })
})
