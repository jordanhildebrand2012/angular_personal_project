import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent {
  allowServer: boolean = false;
  serverCreationStatus: string = 'At the moment, server is not created!';

  constructor() {
    setTimeout(() => {
      this.allowServer = true;
    }, 3000);
  }

  onServerCreation() {
    this.serverCreationStatus = 'Now server has been created, after the click!';
  }
}
