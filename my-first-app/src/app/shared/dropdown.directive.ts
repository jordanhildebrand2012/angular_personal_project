import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[openCloseDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen: boolean = false;

  @HostListener('click') onOpenLink() {
    this.isOpen = !this.isOpen;
  }
}
