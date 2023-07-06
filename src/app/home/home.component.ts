import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../services/housing.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HousingLocationComponent],
  template: `
  <section>
    <form>
    <input type="text" placeholder="filter by City" #filter>
    <button class="primary" type="button" (click)="filterResult(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
    <app-housing-location *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"></app-housing-location>
  </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  HousingLocationList:HousingLocation[]=[]
  housingService:HousingService = inject(HousingService);
  filteredLocationList:HousingLocation[]=[]
  constructor(){
    this.housingService.getAllHousingLocation().then((housingLocationList:HousingLocation[])=>{
      this.HousingLocationList=housingLocationList;
      this.filteredLocationList=housingLocationList
    });
    // this.HousingLocationList = this.housingService.getAllHousingLocation();
  }
  filterResult(text:string){
  if(!text) this.filteredLocationList = this.HousingLocationList;
  this.filteredLocationList = this.HousingLocationList.filter(
    housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
  );
  }
}
