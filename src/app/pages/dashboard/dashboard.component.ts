import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  blockedPage = false;

  loginRes: any;
  loginPage = true;
  loading = false;
  loginBtn = true;
  error = false;
  loginItem = {
    nim: '',
    password: ''
  };

  passError = false;
  passSuccess = false;
  passLoading = false;
  passBtn = true;
  passwordItem = {
    oldPassword: '',
    newPassword: ''
  };

  profileData: any;
  userData = {
    nim: '',
    name: '',
    access: ''
  };

  constructor(private authService: AuthService, private userService: UserService) {
    if (!localStorage.getItem('_himatoken')) {
      this.loginPage = true;
    } else {
      this.loginPage = false;
    }
  }

  ngOnInit(): void {
    this.profile();
  }

  login() {
    localStorage.removeItem('_himatoken');
    localStorage.setItem('nim', this.loginItem.nim);
    this.loginBtn = false;
    this.loading = true;
    const data = {
      nim: this.loginItem.nim,
      password: this.loginItem.password,
    };
    this.authService.login(data)
      .subscribe(response => {
        this.loginRes = response;
        localStorage.setItem('_himatoken', this.loginRes.token);
        localStorage.setItem('nim', this.loginItem.nim);
        this.loginPage = false;
        this.loading = false;
        this.loginBtn = true;
        this.profile();
      }, error => {
        this.loginBtn = true;
        this.loading = false;
        this.error = true;
      });
  }

  changePassword() {
    this.passBtn = false;
    this.passLoading = true;
    const data = {
      old_password: this.passwordItem.oldPassword,
      new_password: this.passwordItem.newPassword
    };
    this.authService.changePassword(data, localStorage.getItem('nim'))
      .subscribe(response => {
        this.passLoading = false;
        this.passSuccess = true;
        this.passBtn = true;
      }, error => {
        this.passLoading = false;
        this.passError = true;
        this.passBtn = true;
      })
  }

  logout() {
    const data = {
      nim: localStorage.getItem('nim')
    };
    this.authService.logout(data)
      .subscribe(response => {
        localStorage.removeItem('_himatoken');
        localStorage.removeItem('nim');
        this.resetPage();
      }, error => {
        localStorage.removeItem('_himatoken');
        localStorage.removeItem('nim');
        this.resetPage();
      })
  }

  resetPage() {
    if (!localStorage.getItem('_himatoken')) {
      this.loginPage = true;
    } else {
      this.loginPage = false;
    }
  }

  profile() {
    if (!localStorage.getItem('nim')) {

    } else {
      this.userService.getById(localStorage.getItem('nim'))
        .subscribe(data => {
          this.profileData = data;
          if (this.profileData.data.access !== 'admin') {
            this.blocked();
          } else {
            this.userData = {
              name: this.profileData.data.name,
              nim: this.profileData.data.id,
              access: this.profileData.data.access
            };
          }
        }, error => {

        });
    }
  }

  blocked() {
    localStorage.removeItem('_himatoken');
    localStorage.removeItem('nim');
    this.loginItem = {
      nim: '',
      password: ''
    };
    this.blockedPage = true;
  }

}
