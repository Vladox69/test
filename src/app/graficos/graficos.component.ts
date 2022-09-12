import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import Color from 'src/models/color.interface';
import Producto from 'src/models/producto.interface';
import { ColorService } from '../services/color.service';
import { ProductoAfService } from '../services/producto-af.service';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css'],
})
export class GraficosComponent implements OnInit {
  _colores: Color[] = [];
  _color!: Color;
  _productos: Producto[] = [];
  _producto!:Producto;

  formColores: FormGroup = new FormGroup({
    ejem: new FormControl('Ejemplo', Validators.required),
    coloresArr: new FormArray([]),
  });

  formProducto:FormGroup=new FormGroup({
    nombre:new FormControl('',Validators.required),
    precio:new FormControl('',Validators.required),
    colores:new FormArray([])
  })

  constructor(
    private colorService: ColorService,
    private productoService: ProductoAfService
  ) {}

  ngOnInit(): void {
    this.getDatos();
  }

  getDatos() {
    this.colorService.getColores().subscribe((response) => {
      this._colores = [];
      response.forEach((color: any) => {
        this._colores.push({
          id: color.payload.doc.id,
          ...color.payload.doc.data(),
        });
      });
    });
    this.productoService.getProductos().subscribe((response) => {
      this._productos = [];
      response.forEach((producto: any) => {
        this._productos.push({
          id: producto.payload.doc.id,
          ...producto.payload.doc.data(),
        });
      });
    });

  }

  getColorById(color: Color) {
    this.colorService.getColor(color.id).subscribe((response) => {
      this._color = { id: color.id, ...response.payload.data() };
    });
  }

  async deleteColor(color: Color) {
    await this.colorService.deleteColor(color.id);
  }

  get coloresArr() {
    return this.formColores.get('coloresArr') as FormArray;
  }

  addColor() {
    this.coloresArr.push(new FormControl(''));
  }

  get colores(){
    return this.formProducto.get('colores') as FormArray;
  }

  addColorProd(color=''){
    this.colores.push(new FormControl(color));
  }

  removeColorProd(index:number){
    this.colores.removeAt(index);
  }

  
  enviar() {
  }

  async enviarProducto(){
    let response= await this.productoService.addProducti(this.formProducto.value)
    console.log(response);
  }

  getProductoById(id:string){
    this.productoService.getProducto(id).subscribe((response)=>{
      this._producto=response.payload.data() as Producto;
      this._producto.id=id;
      this.setValuesProducto(this._producto);
    });
  }

  setValuesProducto(producto:Producto){
    this.formProducto.get('nombre')?.setValue(producto.nombre)
    this.formProducto.get('precio')?.setValue(producto.precio)
    this.createControlColores(producto.colores);
  }

  createControlColores(colores:string[]){
    this.colores.clear();
    for(let index in colores){
      this.addColorProd(colores[index]);
    }
  }

}
