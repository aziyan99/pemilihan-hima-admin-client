import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResultService } from 'src/app/services/result/result.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
	results : any;
	resultsCandidate:any;
	resultsData = {
		nim:'',
		name:'',
		candidate_id:'',
		election_id:'',
	}


  constructor(private router: Router, private resultService:ResultService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('_himatoken')) {
      this.router.navigate(['dashboard']);
    }
  	this.retriveResult();
  	this.retriveResultByCandidate();
  }

  retriveResult(){
  	this.resultService.getAll()
  		.subscribe(res => {
  			this.results = res;
  			this.results = this.results.data;
  		}, error => {
  			console.log(error);
  		});
  }

  retriveResultByCandidate(){
  	this.resultService.getByCandidate()
  		.subscribe(res => {
  			this.resultsCandidate = res;
  			this.resultsCandidate = this.resultsCandidate.data;
  		});
  }

  clearData(){
  	var check = confirm('Clear this data?');
    if (check == true) {
      this.resultService.destroyData()
        .subscribe(res => {
          this.ngOnInit();
        });
    } else {
      this.ngOnInit();
    }
  }

}
