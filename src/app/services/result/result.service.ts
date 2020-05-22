import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8000/api/v1';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http:HttpClient) { }

  getAll(){
  	return this.http.get(baseUrl + '/results?token=' + localStorage.getItem('_himatoken'));
  }

  getByCandidate(){
  	return this.http.get(baseUrl + '/result/candidate?token=' + localStorage.getItem('_himatoken'));
  }

  destroyData(){
  	return this.http.delete(baseUrl + '/result/delete?token=' + localStorage.getItem('_himatoken'));
  }
}
