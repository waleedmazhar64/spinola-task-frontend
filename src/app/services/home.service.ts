import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../app.config';

@Injectable({
  providedIn: 'root'
})

export class HomeService {
	constructor(private http: HttpClient) {}
  
  // Variables
	results: any = [];
  	show_table: boolean = false;

  getResults(data){
    return this.http.post(AppSettings.API_ENDPOINT +'get-results', data);
  }

}