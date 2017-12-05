import { Injectable } from '@angular/core';
import *  as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class AuthserviceService {

  token: string;

  constructor(private router: Router) { }


  signupUser(email:string, password:string){
  	console.log('In authservice', email, password)
  	firebase.auth().createUserWithEmailAndPassword(email, password)
  	.catch(
  		function(error){
  			console.log(error);
  		})
  	 .then(
  		function(response){
  			console.log(response);
  		})
  }



  signInUser(email:string, password:string){
  	console.log('In signinUser.', email, password)

    var that = this;
  	firebase.auth().signInWithEmailAndPassword(email, password)
  	.then(
  		(response) => {
        console.log('RESPONSE FROM SERVER:',response)
        firebase.auth().currentUser.getToken().then(
            (token:string) => { this.token=token}
          )
        that.router.navigate(['/']);
      }

  	).catch(
  		function(err){
  			console.log(err);

  		}
  	)
   }

//destroy token to finish logout
  logout(){
    console.log('about to logout');
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/signin']);
  }

   getToken(){
    firebase.auth().currentUser.getToken()
    .then(
      (token:string)=>{
        this.token=token;
      })
    return this.token;
   }
   isAuthenticated(){
    return this.token != null;
   }

}
