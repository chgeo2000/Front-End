import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
 import { MessageService } from 'src/app/services/message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Car } from 'src/app/models/car';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = environment.baseUrl;

  constructor(
              
              private httpClient: HttpClient,
              private messageService: MessageService
            
            ) { }

  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

    private log(message: string) {
      this.messageService.add(`CarService: ${message}`);
    }

   private handleError<T>(operation = 'operation', result?: T) {
     return (error: any): Observable<T> => {
  
      
     console.error(error); 
  
      
       this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
     };
   }
  getAllCars():Observable<Car[]>{
    return this.httpClient.get<Car[]>(`${this.apiUrl}/cars/`)
     .pipe(
       
       tap(_ => this.log('fetched cars')),
       catchError(this.handleError<Car[]>('getAllCars', []))
     );
  }



  getCar(carId: number): Observable<Car>{
    return this.httpClient.get<Car>(`${this.apiUrl}/cars/${carId}`)
     .pipe(
       tap(_ => this.log(`fetched car id=${carId}`)),
       catchError(this.handleError<Car>(`getCar id=${carId}`))
     );
  }

  addCar(carToAdd: Car | undefined): Observable<Car> {
    return this.httpClient.post<Car>(`${this.apiUrl}/cars/`, carToAdd, this.httpOptions).pipe(
      tap((newCar: Car) => this.log(`added car w/ id=${newCar.id}`)),
      catchError(this.handleError<Car>('addCar'))
    );
  }


  updateCar(carToUpdate: Car): Observable<Car> {
    return this.httpClient.put<Car>(`${this.apiUrl}/cars/${carToUpdate.id}`, carToUpdate, this.httpOptions ).pipe(
      tap(_ => this.log(`updated car id=${carToUpdate.id}`)),
      catchError(this.handleError<Car>('updateCar'))
    );
  }

  deleteCar(carId: number | undefined): Observable<Car> {
    return this.httpClient.delete<Car>(`${this.apiUrl}/cars/${carId}`).pipe(
      tap(_ => this.log(`deleted car id=${carId}`)),
      catchError(this.handleError<Car>('deleteCar'))
    );

  }



}
