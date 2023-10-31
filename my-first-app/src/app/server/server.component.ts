import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
})
export class ServerComponent {
  serverId: number = Math.random();
  serverStatus: string = 'offline';

  getColour() {
    return this.serverId > 0.5 ? 'green' : 'red';
  }
}
