import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChartComponent } from './chart/chart.component';
import { RtChartComponent } from './rtchart/rtchart.component';

const routes: Routes = [
  { path: '', redirectTo: '/chart', pathMatch: 'full' },
  { path: 'chart', component: ChartComponent },
  { path: 'realtime', component: RtChartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
