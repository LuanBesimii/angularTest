import { Component, OnInit, Input,} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Recipe } from '../../recipes.model';
// import { EventEmitter } from 'events';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css'],
  animations: [
    trigger('list2', [
      state('in', style({
        opacity: 1,
        transform:'translateY(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-250px)'
        }),
        animate(500)
      ]),
    ]),
  ]
})
export class RecipesItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;


  ngOnInit(): void {
    
  }
}
