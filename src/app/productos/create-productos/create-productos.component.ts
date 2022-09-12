import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { ColorService } from 'src/app/services/color.service';
import { ProductoAfService } from 'src/app/services/producto-af.service';
import Color from 'src/models/color.interface';
import Producto from 'src/models/producto.interface';

@Component({
  selector: 'app-create-productos',
  templateUrl: './create-productos.component.html',
  styleUrls: ['./create-productos.component.css'],
})
export class CreateProductosComponent implements OnInit {
  id!: string | null;
  producto!: Producto;
  _colores: Color[] = [];
  uploadPercent!: Observable<number>;
  urlImage!: Observable<string>;
  idImage!: string;
  file: any;
  filePath!: string;
  ref: any;
  task: any;

  formProducto: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    precio: new FormControl(''),
    urlImage: new FormControl(''),
    colores: new FormArray([]),
  });

  constructor(
    private activedRoute: ActivatedRoute,
    private productoService: ProductoAfService,
    private colorService: ColorService,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    this.id = this.activedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getData();
    if (this.id != null) {
      this.getDataProducto();
    }
  }

  get colores() {
    return this.formProducto.get('colores') as FormArray;
  }

  addColorProd(color = '') {
    this.colores.push(new FormControl(color));
  }

  setValuesProducto(producto: Producto) {
    this.formProducto.get('nombre')?.setValue(producto.nombre);
    this.formProducto.get('precio')?.setValue(producto.precio);
    this.formProducto.get('urlImage')?.setValue(producto.urlImage);
    this.createControlColores(producto.colores);
  }

  createControlColores(colores: string[]) {
    this.colores.clear();
    for (let index in colores) {
      this.addColorProd(colores[index]);
    }
  }

  getDataProducto() {
    this.productoService.getProducto(this.id!).subscribe((response) => {
      this.producto = response.payload.data() as Producto;
      this.producto.id = this.id!;
      this.setValuesProducto(this.producto);
    });
  }

  getData() {
    this.colorService.getColores().subscribe((response) => {
      response.forEach((element: any) => {
        this._colores.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
    });
  }

  removeColorProd(index: number) {
    this.colores.removeAt(index);
  }

  async enviarProducto() {
    if (this.id == null) {
      this.task = this.storage.upload(this.filePath, this.file);
      this.task.snapshotChanges().pipe(finalize(() => (this.urlImage = this.ref.getDownloadURL()))).subscribe();
      await this.productoService.addProducti(this.formProducto.value);
    } else {
      await this.productoService.updateProducto(
        this.id,
        this.formProducto.value
      );
    }
    this.router.navigate(['']);
  }

  imageUpload(evento: any) {
    this.idImage = Math.random().toString(36).substring(2);
    this.file = evento.target.files[0];
    this.filePath = `upload/file_${this.idImage}`;
    this.ref = this.storage.ref(this.filePath);
  }
}
