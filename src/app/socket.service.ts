import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  ws;
  uri = 'ws://localhost:8888/';

  constructor() { }

  SocketConnection() {
      this.ws = new WebSocket(this.uri);
      return new Observable(observer => {
          this.ws.onmessage = (e) => {
            // console.log(e.data);
            try {
              const object = JSON.parse(e.data);
              observer.next(object);
            } catch (e) {
              console.log('Cannot parse data : ' + e);
            }
          };
          this.ws.onerror = (event) => observer.error(event);
          this.ws.onclose = (event) => observer.complete();
        });
      // return webSocket(this.uri);
  }
}
