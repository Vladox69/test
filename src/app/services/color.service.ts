import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private firestore: AngularFirestore) { }

  public getColores():Observable<any>{
    return this.firestore.collection('color').snapshotChanges();
  }

  public getColor(id:string):Observable<any>{
    return this.firestore.collection('color').doc(id).snapshotChanges();
  }

  public deleteColor(id:string):Promise<any>{
    return this.firestore.collection('color').doc(id).delete();
  }

}
