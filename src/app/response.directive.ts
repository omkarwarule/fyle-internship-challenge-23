import { Directive,ElementRef,HostListener } from '@angular/core';

@Directive({
  selector: '[appResponse]'
})
export class ResponseDirective {

 
  constructor(private obj:ElementRef) 
  { 
    console.log("inside constructor")
  }
  @HostListener('mouseenter') onmouseenter()
  {
    this.obj.nativeElement.style.background='blue';
  }
  @HostListener('mouseleave') onmouseleave()
  {
    this.obj.nativeElement.style.background='white';
  }

}
