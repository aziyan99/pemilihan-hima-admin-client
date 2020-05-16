import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const baseUrl = "http://localhost:8000/api/v1";

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl + '/candidates?token=' + localStorage.getItem('_himatoken'));
  }

  getById(id) {
    return this.http.get(baseUrl + '/candidate/' + id + '?token=' + localStorage.getItem('_himatoken'));
  }

  store(data) {
    return this.http.post(baseUrl + '/candidate?token=' + localStorage.getItem('_himatoken'), data);
  }

  destroy(id) {
    return this.http.delete(baseUrl + '/candidate/' + id + '?token=' + localStorage.getItem('_himatoken'));
  }
}
