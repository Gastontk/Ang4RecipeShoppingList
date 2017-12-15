import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import{ AuthserviceService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinPage:boolean = false;
  constructor(private authService: AuthserviceService) { }

  ngOnInit() {
    this.signinPage = true;
  }
  ngOnDestroy(){
    this.signinPage = false;
  }

  onSignin(form: NgForm){
  	console.log(form.value);
  	const email = form.value.email;
  	const password =  form.value.password;
  	this.authService.signInUser(email, password);
  	  form.reset()
  }

}
