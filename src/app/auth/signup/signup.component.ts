import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgForm, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
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
          transform: 'translateX(350px)'
        }),
        animate(700)
      ]),
    ]),
  ],
  
})

export class SignupComponent implements OnInit {
  // const swal:SweetAlert;
  hide: boolean;
  hide2: boolean;
  public Formdata:any = {};
  formName: FormGroup;
  constructor(private authService: AuthService ,private router :Router , private _cookieService: CookieService) { 
  }
  ngOnInit(): void {
  }
  // get repassword(){ return this.formName.get('custdetails.repassword'); }

  
  
  onSignup(form: NgForm){
    console.log("called");
    const email = form.value.email;
    const password = form.value.password;
    const repassword = form.value.repassword;
    console.log(email, password, repassword);
    // this.cookie.set("email", email);
    // this.cookie.set("password", password);
    // alert(this.cookie.get(email));
    // alert(this.cookie.get(password));
    
    this.authService.signupUser(email, password);
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        // toast.addEventListener('mouseenter', Swal.stopTimer)
        // toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Signed up successfully',
      
    })
    setTimeout(() => {
    this.router.navigate(['/signin']);
    }, 3000);
  }

}
