import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  ws;
  uri = 'ws://localhost:8888/';
  socket = new Observable(observer => {
    this.ws = new WebSocket(this.uri);
    this.ws.onmessage = (e) => {
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

  constructor() { }
}
