import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8000/api/v1';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl + '/users?token=' + localStorage.getItem('_himatoken'));
  }

  getById(id) {
    return this.http.get(baseUrl + '/user/' + id + '?token=' + localStorage.getItem('_himatoken'));
  }

  store(data) {
    return this.http.post(baseUrl + '/user?token=' + localStorage.getItem('_himatoken'), data);
  }

  update(id, data) {
    return this.http.patch(baseUrl + '/user/' + id + '?token=' + localStorage.getItem('_himatoken'), data);
  }

  destroy(id) {
    return this.http.delete(baseUrl + '/user/' + id + '?token=' + localStorage.getItem('_himatoken'));
  }

  setAdmin(data){
    return this.http.post(baseUrl + '/user/setadmin?token=' + localStorage.getItem('_himatoken'), data);
  }

}
