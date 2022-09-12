import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoAfService } from 'src/app/services/producto-af.service';
import Producto from 'src/models/producto.interface';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrls: ['./list-productos.component.css']
})
export class ListProductosComponent implements OnInit {

  productos:Producto[]=[];
  uploadPercent!:Observable<number>;
  urlImage!:Observable<string>;
  idImage!:string;
  file:any;
  filePath!:string;
  ref:any;
  task:any;

  constructor(private productoService:ProductoAfService,private router:Router,private storage:AngularFireStorage) { 
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.productoService.getProductos().subscribe(response=>{
      this.productos=[];
      response.forEach((element:any) => {
          this.productos.push({
            id:element.payload.doc.id,
            ...element.payload.doc.data()
          });
      });
    });
    let rf=this.storage.ref('upload/file_8rgtgaj74po');
    let url =rf.getDownloadURL();
    url.subscribe(res=>{
      console.log(res);
    })
  }

  nuevoProducto(){
    this.router.navigate(['/nuevo-producto']);
  }

  editarProducto(id:string){
    this.router.navigate(['/editar-producto',id]);
  }

  eliminarProducto(id:string){
    this.productoService.deleteProducto(id);
  }

  imageUpload(evento:any){
    this.idImage=Math.random().toString(36).substring(2);
    this.file=evento.target.files[0];
    this.filePath=`upload/file_${this.idImage}`;
    this.ref =this.storage.ref(this.filePath);
    this.task =this.storage.upload(this.filePath,this.file);
    this.task.snapshotChanges().pipe(finalize(()=>this.urlImage=this.ref.getDownloadURL())).subscribe();
  }

}
