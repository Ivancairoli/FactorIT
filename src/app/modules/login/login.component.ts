import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/User.model';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  value: string | undefined;
  formGroup: FormGroup;
  usersList: User[] = []
  membership: string;
  encontrado: boolean;
  inicioSesion: boolean = false;

  usuario: User;

  constructor(private userService: UserService, private router: Router, private productService: ProductService, private authService: AuthService) {
    this.formGroup = new FormGroup({
      username: new FormControl('',[]),
      password: new FormControl('',[])
    })
  }

  ngOnInit(): void {
    this.getUsers();

    this.authService.sesionIniciada.subscribe((res) => {
      this.inicioSesion = res;
    });
  }

  login() {
    let usuario = this.formGroup.controls['username'].value;
    let contrasenia = this.formGroup.controls['password'].value;

    this.usersList.forEach(cliente => {
      if(usuario === cliente.name.toString().toLowerCase() && contrasenia === cliente.password.toString().toLowerCase()){
        this.membership = cliente.membership;
        this.encontrado = true;
        // this.productService.inicioSesion.next(true);
        this.authService.guardarDatosUsuario(cliente)
      }
    });
    if(this.encontrado){
        this.authService.iniciarSesion();
        this.router.navigateByUrl("/shop");
    }
    else{
      alert('Usuario no encontrado');
    }

    this.formGroup.reset();


  }

  getUsers() {
    this.userService.getUsers().subscribe(doc => {
      doc.forEach((element: any) => {
        this.usersList.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      })
    })
  }

  redirectTo(url: string): void {
    this.router.navigateByUrl(url)
  }

  // Agregar(){
  //   let usuario:User = {id: '', name: 'normal3', password: 'normal3', membership: 'normal', userImage: '', compras: []};
  //   this.userService.createUser(usuario);

  // }

}
