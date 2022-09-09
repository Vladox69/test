import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import  Producto  from 'src/models/producto.interface';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  constructor(private productoService:ProductosService) { }
  productos!:Producto[];
  ngOnInit(): void {
  }

  productosForm:FormGroup=new FormGroup({
    nombre:new FormControl('',Validators.required),
    precio:new FormControl('',Validators.required),
    colores:new FormArray([
      new FormControl('/color/qsYhk05wqob6yMnXderL',Validators.required)
    ],Validators.required)
  });

  async enviar(){
    console.log(this.productosForm.value);
    let response = await this.productoService.addProducto(this.productosForm.value);
    console.log(response);
  }

  recuperar(){
    this.productoService.getProductos().subscribe(response=>{
      this.productos=response;
      console.log(this.productos);
    });
  }

  async onClickDelete(producto:Producto){
    let response= await this.productoService.eliminarProducto(producto);
    console.log(response);
  }

}
