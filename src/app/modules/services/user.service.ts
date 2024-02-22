import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  getUsers(): Observable<any> {
    return this.firestore.collection('Usuarios').snapshotChanges()
  }

  createUser(usuario: User): Promise<any>{
    return this.firestore.collection('Usuarios').add(usuario)
  }

  updateUser(id: string, usuario: any): Promise<any> {
    return this.firestore.collection('Usuarios').doc(id).update(usuario);
  }

  getUserById(id:string): Observable<any> {
    return this.firestore.collection('Usuarios').doc(id).valueChanges()
  }
  
}
