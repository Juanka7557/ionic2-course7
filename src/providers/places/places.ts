import { Injectable } from '@angular/core';
import {Place} from "../../models/place";
import {Location} from '../../models/location';
import {NativeStorage} from "@ionic-native/native-storage";

/*
  Generated class for the PlacesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlacesProvider {

  private places: Place[] = [];
  constructor(private storage: NativeStorage) {
    console.log('Hello PlacesProvider Provider');
  }

  addPlace(title: string,
    description: string,
    location: Location,
    imageUrl: string){
    const place = new Place(title,description, location, imageUrl);
  this.places.push(place);
  this.storage.setItem('places', {places: this.places})
    .then()
    .catch( (error)=> {
      console.log(error.message);
      this.places.splice(this.places.indexOf(place),1);
    })
}
  loadPlaces(){
    return this.places.slice();
  }

  fetchPlaces(){
    return this.storage.getItem('places');
  }
  deletePlace(index: number){
    this.places.splice(index,1);
    this.storage.setItem('places', {places: this.places})
      .then()
      .catch( (error)=> {
        console.log(error.message);
      })
  }

}
