import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car/car.service';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: Car[] = [];
  closeResult?: string;

  constructor(private carService: CarService,
              private router: Router,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllCars();
  }

  getAllCars():void{
    this.carService.getAllCars()
      .subscribe(cars => {this.cars = cars;
        console.log(cars)}
        );
  }


  delete(car: Car): void {
  
    this.carService.deleteCar(car.id).subscribe(res => this.getAllCars());
  }

  open(content: any, car: Car) {  
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.delete(car);  
      }  
    }, (reason) => {  
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
    });  
  }  
  
  private getDismissReason(reason: any): string {  
    if (reason === ModalDismissReasons.ESC) {  
      return 'by pressing ESC';  
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {  
      return 'by clicking on a backdrop';  
    } else {  
      return `with: ${reason}`;  
    }  
  }  
  

  

  

}
