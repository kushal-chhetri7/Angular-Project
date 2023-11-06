import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {

  constructor(private elementRef:ElementRef) {}

  @HostListener('click') ClickedDropDown(){
    this.elementRef.nativeElement.classList.toggle('open')
  }
}
