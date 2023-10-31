import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent {
  allowServer: boolean = false;
  serverCreationStatus: string = 'At the moment, server is not created!';
  serverName: string = 'testing';
  username: string = '';
  servers: string[] = ['Server1', 'Server2', 'Server3'];

  constructor() {
    setTimeout(() => {
      this.allowServer = true;
    }, 3000);
  }

  onServerCreation() {
    this.serverCreationStatus =
      'Now server has been created, after the click! and its name is ' +
      this.serverName;
    this.servers.push(this.serverName);
  }

  onServerNameUpdate(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
