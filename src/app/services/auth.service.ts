import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apikey = 'AIzaSyB-xM0zwN4Zj0IAuX6C31hAxsJYNSWmOV8';

  userToken: string;

  // Crear nuevo usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Iniciar sesión con email y password
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient) {
    this.leerToken();
  }

  logout(){

    localStorage.removeItem('token');
    
  }

  login( usuario: UsuarioModel){
    const authData = {
      //email: usuario.email,
      //password: usuario.password,
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      ` ${ this.url}/accounts:signInWithPassword?key=${ this.apikey }`, authData
    ).pipe(
      map( resp => {
        
        this.guardarToken( resp['idToken'] );
        return resp;
      })
    );

  }

  registrarUsuario( usuario: UsuarioModel){

    const authData = {
      //email: usuario.email,
      //password: usuario.password,
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
     ` ${ this.url}/accounts:signUp?key=${ this.apikey }`, authData
    ).pipe(
      map( resp => {
        this.guardarToken( resp['idToken'] );
        return resp;
      })
    );    

    
  }

  private guardarToken( idToken: string ){

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

  }

  leerToken(){

      if(localStorage.getItem('token')){
        this.userToken = localStorage.getItem('token'); 
      } else{
        this.userToken = '';
      }

      return this.userToken;
  }

  estaAutenticado() : boolean {
    console.log('Guard');
    return this.userToken.length > 2;
  }
}
