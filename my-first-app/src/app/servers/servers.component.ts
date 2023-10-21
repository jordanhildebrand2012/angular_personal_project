import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent {
  allowServer: boolean = false;

  constructor() {
    setTimeout(() => {
      this.allowServer = true;
    }, 3000);
  }
}
