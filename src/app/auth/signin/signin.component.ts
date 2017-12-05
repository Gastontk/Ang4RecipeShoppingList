import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import{ AuthserviceService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthserviceService) { }

  ngOnInit() {
  }

  onSignin(form: NgForm){
  	console.log(form.value);
  	const email = form.value.email;
  	const password =  form.value.password;
  	this.authService.signInUser(email, password);
  	  form.reset()
  }

}