import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidatesService } from 'src/app/services/candidates/candidates.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {

  loading = false;
  btnAdd = true;
  errorM = false;
  successM = false;
  candidateData: any;
  insertCandidate = {
    nim: ''
  };

  constructor(private router: Router, private candidateService: CandidatesService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('_himatoken')) {
      this.router.navigate(['dashboard']);
    }
    this.retriveData();
  }

  retriveData() {
    this.candidateService.getAll()
      .subscribe(data => {
        this.candidateData = data;
        this.candidateData = this.candidateData.data;
      }, error => {
        console.log(error);
      })
  }

  saveData() {
    this.btnAdd = false;
    this.loading = true;
    const data = {
      nim: this.insertCandidate.nim
    };
    this.candidateService.store(data)
      .subscribe(response => {
        this.loading = false;
        this.btnAdd = true;
        this.successM = true;
        this.clearForm();
        this.ngOnInit();
      }, error => {
        console.log(error);
        this.loading = false;
        this.btnAdd = true;
        this.errorM = true;
        this.clearForm();
      })
  }

  clearForm() {
    this.insertCandidate = {
      nim: ''
    };
  }

  deleteData(id) {
    var check = confirm('Delete this data?');
    if (check == true) {
      this.candidateService.destroy(id)
        .subscribe(res => {
          this.clearForm();
          this.ngOnInit();
        });
    } else {
      this.ngOnInit();
    }
  }

}
