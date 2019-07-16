import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import { switchMap } from 'rxjs/operators'

import { Hero } from '../hero'
import { HeroService } from '../hero.service'

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  lat = 45.40298
  lng = 10.9659241

  hero: Hero

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero()
  }

  getHero(): void {
    this.route.paramMap
      .pipe(switchMap(params => this.heroService.getHero(+params.get('id'))))
      .subscribe(hero => (this.hero = hero))
  }

  goBack(): void {
    this.location.back()
  }

  save(): void {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack())
  }
}
