export class Car {
  
    constructor( public model: string='' , public price: number | null, public imageUrl: string='', 
        public kmTravelled:  number | null, 
        public manufacturingYear: number | null,
        public city: string='', 
        public transmissionType: string='',
        public id?: number){}
    

}