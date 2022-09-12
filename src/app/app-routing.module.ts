import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraficosComponent } from './graficos/graficos.component';
import { CreateProductosComponent } from './productos/create-productos/create-productos.component';
import { ListProductosComponent } from './productos/list-productos/list-productos.component';
import { ReportesComponent } from './reportes/reportes.component';

const routes: Routes = [
  {path:'',redirectTo:'productos',pathMatch:'full'},
  {path:'reportes',component:ReportesComponent},
  {path:'graficos',component:GraficosComponent},
  {path:'productos',component:ListProductosComponent},
  {path:'nuevo-producto',component:CreateProductosComponent},
  {path:'editar-producto/:id',component:CreateProductosComponent},
  {path:'*',redirectTo:'productos',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
