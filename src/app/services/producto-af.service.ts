import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Producto from 'src/models/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoAfService {

  constructor(private firestore:AngularFirestore) { }

  public getProductos(){
    return this.firestore.collection('producto').snapshotChanges();
  }

  public getProducto(id:string){
    return this.firestore.collection('producto').doc(id).snapshotChanges();
  }

  public addProducti(producto:Producto){
    return this.firestore.collection('producto').add(producto);
  }

  public updateProducto(id:string,producto:Producto){
    return this.firestore.collection('producto').doc(id).update(producto);
  }

  public deleteProducto(id:string){
    return this.firestore.collection('producto').doc(id).delete();
  }

}
