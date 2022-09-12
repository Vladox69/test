import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColorService } from 'src/app/services/color.service';
import Color from 'src/models/color.interface';

@Component({
  selector: 'app-list-colores',
  templateUrl: './list-colores.component.html',
  styleUrls: ['./list-colores.component.css']
})
export class ListColoresComponent implements OnInit {

  colores!:Color[];

  constructor(private colorService:ColorService,private router:Router) { 
    this.getData();
  }

  ngOnInit(): void {
  }

  getData(){
    this.colorService.getColores().subscribe(response=>{
      this.colores=[];
      response.forEach((element:any) => {
        this.colores.push({id:element.payload.doc.id,...element.payload.doc.data()})
      });
    })
  }

  onClickNuevo(){
    this.router.navigate(['/nuevo-color'])
  }

  onClickEditar(id:string){
    this.router.navigate(['/editar-color',id]);
  }

  onClickEliminar(id:string){
    this.colorService.deleteColor(id);
  }

}
