import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  collapsed: boolean = true;
  @Output() onSelectedCurrentLink = new EventEmitter<string>();
  onSelected(linkName: string) {
    this.onSelectedCurrentLink.emit(linkName);
  }
}
