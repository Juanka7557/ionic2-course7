import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {AddPlacePage} from "../add-place/add-place";
import {Place} from "../../models/place";
import {PlacesProvider} from "../../providers/places/places";
import {PlacePage} from "../place/place";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  places: Place[]=[];
  addPlacePage= AddPlacePage

  constructor(
    public navCtrl: NavController,
    private placesService: PlacesProvider,
    private modalCtrl: ModalController) {

  }

  ionViewWillEnter(){
    this.places=this.placesService.loadPlaces();
  }
  onOpenPlace(placeParm:Place, indexParm: number){
    const modal = this.modalCtrl.create(PlacePage,{place: placeParm, index:indexParm});
    modal.present();
    modal.onDidDismiss((response)=>
      {
        if(response.deleted){
          this.places=this.placesService.loadPlaces();
        }
      }
    )
  }

  ngOnInit(){
    this.placesService.fetchPlaces()
      .then((places: Place[])=>{
      this.places = (places != null ? places : []);
    }).catch((err)=>{
      console.log(err);
    });

  }
}
