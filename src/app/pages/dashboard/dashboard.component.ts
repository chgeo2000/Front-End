import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car/car.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  cars: Car[] = [];

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars(): void {
    this.carService.getAllCars()
      .subscribe(cars => {this.cars = cars.slice(1,5);

console.log(cars);
      });
  }

  
 }
