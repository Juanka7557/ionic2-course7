import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { Location } from '../../models/Location'

/**
 * Generated class for the SetLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocationPage {

  location: Location;
  marker : Location= {
    lat: 12.0,
    lng: 17.0
  };
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController) {
    console.log(this.navParams.get('location'));
    this.location=this.navParams.get('location');
    if(this.navParams.get('isSet')){
      this.marker=this.navParams.get('location');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetLocationPage');
  }

  onSetMarker(event: any){
    this.marker = new Location(event.latLng.lat(), event.latLng.lng());
  }

  onConfirm(){
    this.viewCtrl.dismiss({location:this.marker});
  }

  onAbort(){
    this.viewCtrl.dismiss({});
  }
}
