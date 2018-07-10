import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyAiJjnk9HAtHy2wOq7Pom1s3GiZ3LTguZc",
      authDomain: "ng-recipe-book-3d75b.firebaseapp.com"
    })
  }

}
