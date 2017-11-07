// Modules --------------------------------------------------------------
import { RequestsService } from './requests.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ViewContainerRef } from '@angular/core';
import { ConnectionBackend, Http } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


// Rutas ----------------------------------------------------------------
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './app.routes';

// Providers | Services -------------------------------------------------
import { AuthService } from './providers/auth.service';
import { AuthGuardService } from './providers/auth-guard.service';

// Components -----------------------------------------------------------
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { ProtectedComponent } from './components/protected/protected.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProtectedComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    AuthGuardService,
    AuthService,
    RequestsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
