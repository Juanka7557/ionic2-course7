import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Place} from "../../models/place";
import {PlacesProvider} from "../../providers/places/places";


/**
 * Generated class for the PlacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {
  index: number;
  place: Place;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private placesService: PlacesProvider) {
  }

  ionViewWillLoad() {
    this.place= this.navParams.get('place');
    console.log(this.place);
    this.index= this.navParams.get('index');
    console.log(this.index);
    console.log('ionViewDidLoad PlacePage');
  }

  onLeave(deleted = false){
    this.viewCtrl.dismiss({deleted:deleted});
  }

  onDelete(){
    this.placesService.deletePlace(this.index);
    this.onLeave(true);
  }
}
