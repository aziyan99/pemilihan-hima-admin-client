import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { CandidatesComponent } from './pages/candidates/candidates.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsersComponent,
    CandidatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
