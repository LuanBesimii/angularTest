import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from './recipes.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy{
  mediaSub:Subscription;
  deviceXs: boolean;
  constructor(public mediaObserver: MediaObserver) { }

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange)=>{
      // console.log(result.mqAlias);
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
    });
  }
  ngOnDestroy(){
    this.mediaSub.unsubscribe();
  }
}
