import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css'],
  animations: [
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform:'translateY(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(250px)'
        }),
        animate(700)
      ]),
    ]),
  ]
})
export class RecipeStartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
