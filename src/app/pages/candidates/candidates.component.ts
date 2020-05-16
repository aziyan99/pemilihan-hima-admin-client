import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidatesService } from 'src/app/services/candidates/candidates.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
