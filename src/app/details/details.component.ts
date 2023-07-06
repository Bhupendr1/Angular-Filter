import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'
import { HousingService } from '../services/housing.service';
import { HousingLocation } from '../housing-location';
import{FormControl,FormGroup,ReactiveFormsModule} from '@angular/forms'
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  template: `
<article>
  <img class="listing-photo" [src]="housingLocation?.photo" alt="">
  <section class="listing-description">
    <h2 class="listing-heading">{{housingLocation?.name}}</h2>
    <p class="listing-location">{{housingLocation?.city}},{{housingLocation?.state}}</p>
  </section>
  <section class="listing-features">
<h2 class="section-heading">About this housing location</h2>
<ul>
  <li>units avaiable:{{housingLocation?.availableUnits}}</li>
  <li>Does the location have wifi:{{housingLocation?.wifi}}</li>
  <li>does this location have laundry:{{housingLocation?.laundry}}</li>
</ul>
  </section>
  <section class="listing-apply">
    <h2 class="section-heading">apply now to live here</h2>
    <form [formGroup]="applyForm" (submit)="submitapplication()">
      <label for="first-name">First Name</label>
      <input id="first-name" type="text" formControlName="firstName">

      <label for="last-name">last Name</label>
      <input id="last-name" type="text" formControlName="lastName">

      <label for="email">Email</label>
      <input id="email" type="email" formControlName="email">
      <button class="primary" type="submit">apply Now</button>
    </form>
  </section>
</article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
applyForm = new FormGroup({
  firstName:new FormControl(''),
  lastName:new FormControl(''),
  email:new FormControl(''),
})
  housingLocation: HousingLocation | undefined
  constructor(private housingService: HousingService, private route: ActivatedRoute) {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation=>{
      this.housingLocation=housingLocation
    });
    // this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }
  submitapplication(){
    this.housingService.submitapplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
