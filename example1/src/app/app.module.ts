import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { UserComponent } from './components/user/user.component';

import { DataService } from './services/data.service';



@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
