import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from 'src/app/pages/cars/cars.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { CarDetailComponent } from './pages/car-detail/car-detail.component';


const routes: Routes = [

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent }, 
  { path: 'cars', component: CarsComponent },
  { path: 'cars/add', component: CarDetailComponent},
  { path: 'cars/:id', component: CarDetailComponent}     
  
  
  
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }