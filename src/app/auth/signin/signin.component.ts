import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  animations: [ 
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform:'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(250px)'
        }),
        animate(600)
      ]),
    ]),
    trigger('list2', [
      state('in', style({
        opacity: 1,
        transform:'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-250px)'
        }),
        animate(700)
      ]),
    ]),
  ],
})
export class SigninComponent implements OnInit {

  hide: boolean;
  
  constructor(private authServise: AuthService) { }

  ngOnInit(): void {
  }

  onSignin(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);
    this.authServise.signinUser(email, password)
  }
  

}
