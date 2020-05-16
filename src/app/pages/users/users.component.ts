import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userObj: any;

  successM = false;
  errorM = false;
  btnSave = true;
  loading = false;
  userData = {
    nim: '',
    name: ''
  };

  addForm = true;
  editForm = false;
  userEditObj: any;


  nim = localStorage.getItem('nim');

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('_himatoken')) {
      this.router.navigate(['dashboard']);
    }
    this.retriveData();
  }

  retriveData() {
    this.userService.getAll()
      .subscribe(data => {
        this.userObj = data;
        this.userObj = this.userObj.data
      }, error => {
        console.log(error);
      });
  }

  saveData() {
    this.btnSave = false;
    this.loading = true;
    const data = {
      nim: this.userData.nim,
      name: this.userData.name
    };
    this.userService.store(data)
      .subscribe(res => {
        this.errorM = false;
        this.loading = false;
        this.btnSave = true;
        this.successM = true;
        this.clearForm();
        this.ngOnInit();
      }, error => {
        this.successM = false;
        this.loading = false;
        this.btnSave = true;
        this.errorM = true;
        console.log(error);
      });
  }

  clearForm() {
    this.userData = {
      nim: '',
      name: ''
    };
  }

  deleteData(id) {
    var check = confirm('Delete this data?');
    if (check == true) {
      this.userService.destroy(id)
        .subscribe(res => {
          this.clearForm();
          this.ngOnInit();
        });
    } else {
      this.ngOnInit();
    }

  }

  setEditForm(id) {
    this.addForm = false;
    this.editForm = true;
    this.userService.getById(id)
      .subscribe(data => {
        this.userEditObj = data;
        this.userData = {
          nim: this.userEditObj.data.id,
          name: this.userEditObj.data.name,
        };
      });
  }

  updateData() {
    this.btnSave = false;
    this.loading = true;
    const data = {
      name: this.userData.name
    };
    this.userService.update(this.userData.nim, data)
      .subscribe(res => {
        this.errorM = false;
        this.loading = false;
        this.btnSave = true;
        this.successM = true;
        this.editForm = false;
        this.addForm = true;
        this.clearForm();
        this.ngOnInit()
      }, error => {
        this.successM = false;
        this.loading = false;
        this.btnSave = true;
        this.errorM = true;
        console.log(error);
      });
  }

}
