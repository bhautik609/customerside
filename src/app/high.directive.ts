import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHigh]'
})
export class HighDirective {
  bgcolor:string;
  @Input() incolor:string='red';

  constructor() { }
  @HostListener('mouseenter')mouseenter()
{
  this.bgcolor=this.incolor;
}
@HostListener('mouseleave')mouseleave(){
  this.bgcolor='white';
}
@HostBinding('style.background-color')get setcolor(){
  return this.bgcolor;
}

}
