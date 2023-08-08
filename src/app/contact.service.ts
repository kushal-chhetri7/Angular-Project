import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiKey = "821125c0cf0673431753f8c4b077fbc6-us9"

  constructor(private http: HttpClient) { }

  addEmail(body: any) {


    const url = "https://us9.api.mailchimp.com/3.0/lists/41d21efdd9/members"

    // Assuming you have an initial headers object
    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + this.apiKey);
    headers = headers.append('Access-Control-Allow-Origin', '*');

    return this.http.post(url, body, { headers: headers });

  }
}
