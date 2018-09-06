import { Component } from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  ModalController,
  NavController,
  NavParams,
   ToastController
} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SetLocationPage} from "../set-location/set-location";
import {Location} from '../../models/location'
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import {PlacesProvider} from "../../providers/places/places";




/**
 * Generated class for the AddPlacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {

  pathTest : string;
  nameTest: string;
  imageUrl: string = '';
  location: Location = {
    lat: 51.678418,
    lng: 7.809007
  };

  isLocationSet: boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private geolocation: Geolocation,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private camera: Camera,
    private placesService: PlacesProvider,
    private toastCtrl: ToastController,
 ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPlacePage');
  }

  onLocate(){
    this.location={lat: 1.0,
      lng: 9.0};

    const loadding= this.loadingCtrl.create({
      content:'Getting you Location...',
      duration: 2500
    });
    loadding.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      this.location.lat=resp.coords.latitude;
      this.location.lng=resp.coords.longitude;
      this.isLocationSet=true;
      console.log(' entro correctamente');
    }).catch((error) => {
      console.log(error);
      const alert= this.alertCtrl.create(
        {title:'Could get location, please pick it manually',
          message:error ,
          buttons:['Ok']});
      alert.present();
    });
    console.log('test ' + this.location.lat+ ' '+this.location.lng);
  }

  onOpenMap(){
    console.log(this.location);
    const mapPage = this.modalCtrl.create(SetLocationPage,
      {location: this.location, isSet:this.isLocationSet});
    mapPage.present();
    mapPage.onDidDismiss(data =>{
      //console.log(data);
      if(data){
        this.location=data.location;
        this.isLocationSet = true;
      }
      //console.log(this.location);
    });

  }

  public onTakePhoto() {
    /*
        let options: CameraOptions = {
          destinationType: this.camera.DestinationType.DATA_URL,
          targetWidth: 1000,
          targetHeight: 1000,
          quality: 100
        }*/
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    })
      .then(imageData => {
        this.imageUrl = `data:image/jpeg;base64,${imageData}`;

      })
      .catch(error => {
        const toast = this.toastCtrl.create({
          message: 'Could not take the image, Please try again',
          duration: 2500
        })
        toast.present();
      });
  }

  onSubmit(form: NgForm){
    this.placesService.addPlace(
      form.value.title,
      form.value.description,
      this.location,
      this.imageUrl);

    form.reset();
    this.isLocationSet=false;
    this.imageUrl='';
    this.location = {
      lat: 51.678418,
      lng: 7.809007
    };


  }
}
