import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { UserComponent }  from './user.component';
import { UserService } from './user.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [     
        BrowserModule,
		HttpModule,
		ReactiveFormsModule
  ],
  declarations: [
        AppComponent,
		UserComponent,
		HeaderComponent
  ],
  providers: [
        UserService
  ],
  bootstrap: [
        AppComponent
  ]
})
export class AppModule { }
