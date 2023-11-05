import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  activeLink: string = 'recipe';
  getCurrentSelectedLink(selectedLink: string) {
    this.activeLink = selectedLink === 'recipe' ? 'recipe' : 'shopping-list';
  }
}
