import { Component, Input, Output, EventEmitter } from '@angular/core'

import { Hero } from '../hero'

@Component({
  selector: 'app-dashboard-hero',
  template: `
    <div (click)="click()" class="module hero">
      {{ hero.name }}
    </div>
  `,
  styleUrls: ['./dashboard-hero.component.css']
})
export class DashboardHeroComponent {
  @Input() hero: Hero
  @Output() selected = new EventEmitter<Hero>()

  click() {
    this.selected.emit(this.hero)
  }
}
