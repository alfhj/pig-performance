import { Component } from '@angular/core';
import { Database, get, ref } from '@angular/fire/database';
import { Router } from '@angular/router';
// import {AddPostService} from '../add-post.service';
// import {Observable} from 'rxjs';
// import {PostPayload} from '../add-post/post-payload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public owner: string = '';
  public location: string = '';
  public pigData: any[] = [];

  // Help text for logic in frontend
  public normalActivity: string = 'normal';
  public genderM: string = 'male';
  public activityH: string = 'high';
  public activityL: string = 'low';

  constructor(private router: Router, private database: Database) {
    const dbRef = ref(this.database, 'farms');

    get(dbRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          this.owner = snapshot
            .child('9cfc573e-d5fc-40e8-a9f1-7613e64f79a1/owner')
            .val();
          this.location = snapshot
            .child('9cfc573e-d5fc-40e8-a9f1-7613e64f79a1/location')
            .val();
          const jsonData = snapshot
            .child('9cfc573e-d5fc-40e8-a9f1-7613e64f79a1/pigs')
            .val();
          this.pigData = Object.entries(jsonData).map((entry) => ({
            id: entry[0],
            ...(entry[1] as object),
          }));
          console.log(this.owner);
          console.log(this.location);
          console.log(this.pigData);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public calcAge(date: string): string {
    const currDate = new Date();
    const opDate = new Date(date);
    let diff = Math.abs(currDate.getTime() - opDate.getTime());
    let diffDays = Math.ceil(diff / (1000 * 3600 * 24) / 30);
    let result = diffDays + ' mnd';
    return result;
  }

  // Denne kan ta inn ID som parameter og navigere videre.
  // Mellomlagre ID for å hente korrekt data
  public viewInfoPage() {
    this.router.navigateByUrl('info-page');
  }
}
