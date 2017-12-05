import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature = 'recipe';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
  ngOnInit(){
  	firebase.initializeApp({
  		apiKey: "AIzaSyCZiHNt3RHEges85sQBlubZgXjGYcw6IA8",
    	authDomain: "ng-recipe-book-3fe5f.firebaseapp.com",
  	})

  }
}
