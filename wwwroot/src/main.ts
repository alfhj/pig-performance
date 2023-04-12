import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from 'firebase/database';
import { AppModule } from './app/app.module';

const firebaseConfig = {
  apiKey: 'AIzaSyANUTe_lBSvWBwJF0i06GCSfbBbqiT9T7E',
  authDomain: 'pig-performance.firebaseapp.com',
  databaseURL: 'https://pig-performance-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'pig-performance',
  storageBucket: 'pig-performance.appspot.com',
  messagingSenderId: '276860636304',
  appId: '1:276860636304:web:52b7c07331b0ad22709c15',
  measurementId: 'G-LCDXPP0BJZ',
};

const app = initializeApp(firebaseConfig);
const db_instance = getDatabase(app);
const db_ref = ref(db_instance);

get(child(db_ref, 'farms')).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
