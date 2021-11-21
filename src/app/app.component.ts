import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  laodedFeature = 'recipe';
  mediaSub:Subscription;
  deviceXs: boolean;
  constructor(public mediaObserver: MediaObserver){}
  ngOnInit(){
    this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange)=>{
      // console.log(result.mqAlias);
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
    });
    firebase.initializeApp({
      //wait JavaScript object with setup(data) of database;
      apiKey: "AIzaSyA0kyGoxMtRNEigG9eA68QgOJsrkDXKixI",
      authDomain: "ng-recipe-book-7c371.firebaseapp.com",
    })
  }
  ngOnDestroy(){
    this.mediaSub.unsubscribe();
  }
  onNavigate(feature: string){
    this.laodedFeature = feature;
  }
}
