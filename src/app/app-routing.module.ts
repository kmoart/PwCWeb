import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutomotrizComponent } from './pages/automotriz/automotriz.component';

const routes: Routes = [
  { path: 'home'    , component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'registro', component: RegistroComponent },
  { path: 'login'   , component: LoginComponent },
  { path: 'automotriz', component: AutomotrizComponent},
  { path: '**', redirectTo: 'registro' }
];

@NgModule({
  imports: [ 
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule { }
