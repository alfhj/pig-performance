import { Component, inject } from '@angular/core';
import { Database, ref, get, child } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Piggio';
  database: Database = inject(Database);
  //items$: Observable<any[]>;

  constructor() {
    const dbRef = ref(this.database, 'farms');
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
}
