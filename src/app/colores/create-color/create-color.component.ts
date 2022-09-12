import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorService } from 'src/app/services/color.service';
import Color from 'src/models/color.interface';

@Component({
  selector: 'app-create-color',
  templateUrl: './create-color.component.html',
  styleUrls: ['./create-color.component.css']
})
export class CreateColorComponent implements OnInit {

  id!:string|null;
  color!:Color;
  formColor:FormGroup=new FormGroup({
    nombre:new FormControl(''),
    valor_hex:new FormControl('#')
  });

  constructor(private colorService:ColorService, private router:Router,private activedRoute: ActivatedRoute,) {
    this.id=this.activedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if(this.id!=null){
      this.getDataColor();
    }
  }

  async onClickGuardar(){
    if(this.id==null){
      await this.colorService.addColor(this.formColor.value);
    }else{
      await this.colorService.updateColor(this.id!,this.formColor.value);
    }
    this.router.navigate(['/colores']);
  }

  getDataColor(){
    this.colorService.getColor(this.id!).subscribe(response=>{
      this.color=response.payload.data() as Color;
      this.color.id!=this.id;
      this.setValuesColor(this.color);
    });
  }

  setValuesColor(color:Color){
    this.formColor.get('nombre')?.setValue(color.nombre);
    this.formColor.get('valor_hex')?.setValue(color.valor_hex);
  }

}
