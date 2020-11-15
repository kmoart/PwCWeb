import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { UsuarioModel } from '../../models/usuario.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  usuario : UsuarioModel;
  recordarme = false;

  constructor( private auth: AuthService,
                private router: Router ) { }

  ngOnInit(): void {

    this.usuario = new UsuarioModel();

  }

  onSubmit( form: NgForm){

    if( !form.valid ){
      return;
    }

    Swal.fire( '', 'Espere por favor...', 'info' );
    Swal.showLoading();

    return this.auth.registrarUsuario( this.usuario )
    .subscribe( resp => {

        console.log( resp );
        Swal.close();

        if( this.recordarme ){
          localStorage.setItem('email', this.usuario.email);
        }

        this.router.navigateByUrl('/home');

    }, ( err ) =>{
      console.log( err.error.error.message );
      Swal.fire( 'Error al autenticar' , err.error.error.message, 'error'  );

    });

  }

}
