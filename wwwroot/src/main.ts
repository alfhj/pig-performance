import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializeApp } from 'firebase/app';
import {
  collection,
  Firestore,
  getDocs,
  getFirestore,
} from 'firebase/firestore/lite';
import { AppModule } from './app/app.module';

const firebaseConfig = {
  apiKey: 'AIzaSyANUTe_lBSvWBwJF0i06GCSfbBbqiT9T7E',
  authDomain: 'pig-performance.firebaseapp.com',
  projectId: 'pig-performance',
  storageBucket: 'pig-performance.appspot.com',
  messagingSenderId: '276860636304',
  appId: '1:276860636304:web:52b7c07331b0ad22709c15',
  measurementId: 'G-LCDXPP0BJZ',
};

const app = initializeApp(firebaseConfig);
const db_instance = getFirestore(app);

async function getFarms(db: Firestore) {
  const farmsCol = collection(db, 'farms');
  const farmSnapshot = await getDocs(farmsCol);
  const farmList = farmSnapshot.docs.map((doc) => doc.data());
  return farmList;
}
console.log(getFarms(db_instance));

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
