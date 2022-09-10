import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import Color from 'src/models/color.interface';
import { ColorService } from '../services/color.service';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {

  colores:Color[]=[];
  color!:Color;

  formColores:FormGroup=new FormGroup({
    ejem:new FormControl('Ejemplo',Validators.required),
    coloresArr:new FormArray([
      
    ])
  });

  constructor(private colorService:ColorService) { }


  ngOnInit(): void {
    this.getDatos();
  }

  getDatos(){
    this.colorService.getColores().subscribe(response=>{
      this.colores=[];
      response.forEach((color:any)=>{
        this.colores.push({
          id:color.payload.doc.id,
          ...color.payload.doc.data()
        })
      })
    });
  }

  getColorById(color:Color){
    this.colorService.getColor(color.id).subscribe(response=>{
      this.color={id:color.id,...response.payload.data()};
    })
  }

  async deleteColor(color:Color){
    await this.colorService.deleteColor(color.id);
  }

  get coloresArr(){
    return this.formColores.get('coloresArr') as FormArray
  }

  addColor(){
    this.coloresArr.push(new FormControl(''));
  }

  enviar(){
    console.log('fff');
    
    console.log(this.formColores.value);
    
  }

}
