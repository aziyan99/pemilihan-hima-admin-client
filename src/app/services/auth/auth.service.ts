import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8000/api/v1'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data) {
    return this.http.post(baseUrl + '/auth/login', data);
  }

  logout(data) {
    return this.http.post(baseUrl + '/auth/logout?token=' + localStorage.getItem('_himatoken'), data);
  }

  changePassword(data, id) {
    return this.http.patch(baseUrl + '/changepassword/' + id + '?token=' + localStorage.getItem('_himatoken'), data);
  }
}
