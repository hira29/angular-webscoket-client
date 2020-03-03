import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getService() {
    const url = 'http://192.168.99.187:9000/get_counter_by_day?website=lazada&days=100';
    return this.http.get(url);
  }
}
