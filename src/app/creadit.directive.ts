import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appCreadit]'
})
export class CreaditDirective {


  constructor() { }
  @HostListener( 'input',['$event'])onkeyup(event:KeyboardEvent)
  {
    const input=event.target as HTMLInputElement;
    let trimed=input.value.replace(/\s+/g,'');
    if(trimed.length>16)
    {
      trimed=trimed.substr(0,16);
    }
    let number=[];
    for (let i=0;i<trimed.length;i+=4){
      number.push(trimed.substr(i,4));
    }
    input.value=number.join('')
    }
  }


