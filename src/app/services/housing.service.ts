import { Injectable } from '@angular/core';
import { HousingLocation } from '../housing-location';
import { promise } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class HousingService {
  url = 'http://localhost:3000/locations';
  constructor() { }
  async getAllHousingLocation(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }
 async getHousingLocationById(id: number): Promise< HousingLocation | undefined> {
  const data = await  fetch(`${this.url}/${id}`);
  return await data.json() ?? {};
  // return this.housingLocationList.find(housingLocation => housingLocation.id === id
  }
  submitapplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }

}
