import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Producto from 'src/models/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private firestore:Firestore) { }

  public addProducto(producto:Producto){
    const productoRef=collection(this.firestore,'producto');
    return addDoc(productoRef,producto);
  }

  public getProductos():Observable<Producto[]>{
    const productoRef=collection(this.firestore,'producto');
    return collectionData(productoRef,{idField:'id'}) as Observable<Producto[]>;
  }

  public eliminarProducto(producto:Producto){
    const productoDocRed=doc(this.firestore,`producto/${producto.id}`)
    return deleteDoc(productoDocRed);
  }
}