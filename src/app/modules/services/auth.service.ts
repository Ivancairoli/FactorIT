import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private inicioSesionSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  datosUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor() { }

  get sesionIniciada() {
    return this.inicioSesionSubject.asObservable();
  }

  get datosUsuario() {
    return this.datosUser.asObservable();
  }

  iniciarSesion() {
    this.inicioSesionSubject.next(true);
  }

  cerrarSesion() {
    this.inicioSesionSubject.next(false);
  }

  guardarDatosUsuario(user: User) {
    this.datosUser.next(user);
  }


}
