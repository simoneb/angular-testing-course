import { Component } from '@angular/core'
import { TestBed, ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { HighlightDirective } from './highlight.directive'

@Component({
  template: `
    <h2 highlight="yellow">Something Yellow</h2>
    <h2 highlight>The Default (Gray)</h2>
    <h2>No Highlight</h2>
    <input #box [highlight]="box.value" value="cyan" />
  `
})
class TestComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestComponent>
  let debugElements
  let bareH2

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [HighlightDirective, TestComponent]
    }).createComponent(TestComponent)

    fixture.detectChanges()

    // all elements with an attached HighlightDirective
    debugElements = fixture.debugElement.queryAll(
      By.directive(HighlightDirective)
    )

    // the h2 without the HighlightDirective
    bareH2 = fixture.debugElement.query(By.css('h2:not([highlight])'))
  })

  // color tests
  it('should have three highlighted elements', () => {
    expect(debugElements.length).toBe(3)
  })

  it('should color 1st <h2> background "yellow"', () => {
    const bgColor = debugElements[0].nativeElement.style.backgroundColor

    expect(bgColor).toBe('yellow')
  })

  it('should color 2nd <h2> background w/ default color', () => {
    const dir = debugElements[1].injector.get(
      HighlightDirective
    ) as HighlightDirective

    const bgColor = debugElements[1].nativeElement.style.backgroundColor

    expect(bgColor).toBe(dir.defaultColor)
  })

  it('should bind <input> background to value color', () => {
    // easier to work with nativeElement
    const input = debugElements[2].nativeElement as HTMLInputElement

    expect(input.style.backgroundColor).toBe('cyan', 'initial backgroundColor')

    // dispatch a DOM event so that Angular responds to the input value change.
    input.value = 'green'
    input.dispatchEvent(new Event('input'))
    fixture.detectChanges()

    expect(input.style.backgroundColor).toBe(
      'green',
      'changed backgroundColor'
    )
  })

  it('bare <h2> should not have a customProperty', () => {
    expect(bareH2.properties.customProperty).toBeUndefined()
  })
})
