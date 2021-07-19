import { Component, OnInit, Input } from '@angular/core';
import {Car} from '../../models/car';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CarService } from 'src/app/services/car/car.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  car: Car | undefined;

  carForm = new FormGroup({
    id: new FormControl(),
    model: new FormControl(),
    price: new FormControl(),
    imageUrl: new FormControl(),
    kmTravelled: new FormControl(),
    manufacturingYear: new FormControl(),
    city: new FormControl(),
    transmissionType: new FormControl()
  })

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private location: Location
    ) { }

  ngOnInit(): void {
    
    this.getCar();
  }
  
  getCar():void{
    
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id){
      this.carService.getCar(id)
      .subscribe(car => this.car = car);
    }
    else{
      this.car = new Car("", null, "", null, null, "", "");
    }
   
   
  }

  goBack():void{
    this.location.back();
  }

  save(): void {
    
    if (this.car?.id) {
      this.carService.updateCar(this.car)
        .subscribe(() => this.goBack());
  }
  else{
    this.carService.addCar(this.car)
    .subscribe(() => this.goBack());
  }
  }  

}
