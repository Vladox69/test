import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraficosComponent } from './graficos/graficos.component';
import { ReportesComponent } from './reportes/reportes.component';

const routes: Routes = [
  {path:'reportes',component:ReportesComponent},
  {path:'graficos',component:GraficosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
