import { Directive, Input, HostListener } from '@angular/core'

@Directive({
  // tslint:disable-next-line
  selector: '[routerLink]'
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any
  navigatedTo: any = null

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams
  }
}
