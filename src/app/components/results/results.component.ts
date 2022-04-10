import { Component, OnInit } from '@angular/core';
import { HomeService } from "../../services/home.service";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

	results: any = [];

  	constructor(private homeService: HomeService) { }

	ngOnInit(): void {
		this.results = this.homeService.results;
	}

}
