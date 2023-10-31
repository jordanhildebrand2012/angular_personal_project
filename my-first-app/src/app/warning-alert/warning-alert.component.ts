import { Component } from '@angular/core';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-warning-alert',
  templateUrl: './warning-alert.component.html',
  styleUrls: ['./warning-alert.component.css'],
})
export class WarningAlertComponent {
  showPassword: boolean = false;
  buttonClickHistory: number[] = [];
  incrementClickedNumber: number = 0;

  toggleParagraph() {
    this.showPassword = !this.showPassword;
    this.buttonClickHistory.push((this.incrementClickedNumber += 1));
  }
}
