import { Component } from '@angular/core';
import { Database, get, ref } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { nb } from 'date-fns/locale';

// import {ActivatedRoute} from '@angular/router';
// import {AddPostService} from '../add-post.service';
// import {PostPayload} from '../add-post/post-payload';

@Component({
  selector: 'app-info',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.css'],
})
export class InfoPageComponent {
  // post: PostPayload;
  // permaLink: Number;

  // This in constructor:
  // private router: ActivatedRoute, private postService: AddPostService

  // ngOnInit() {
  //   this.router.params.subscribe(params => {
  //     this.permaLink = params['id'];
  //   });

  //   this.postService.getPost(this.permaLink).subscribe((data:PostPayload) => {
  //     this.post = data;
  //   },(err: any) => {
  //     console.log('Failure Response');
  //   })
  // }

  public chart: any;
  public dbRef: any;
  private chip_id: string = '12345';

  constructor(private router: Router, private database: Database) {
    this.dbRef = ref(this.database, 'activity_data');
  }

  public viewHomePage() {
    this.router.navigateByUrl('home');
  }

  public async getActivityData(chipId: string): Promise<any[]> {
    let data: any[] = [];

    await get(this.dbRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const result = snapshot.child(chipId).val();
          data = Object.entries(result).map((entry) => ({
            timestamp: parseInt(entry[0]),
            magnitude: parseInt(entry[1] as string),
          }));
          console.log(data);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return data;
  }

  public async createChart() {
    const data = await this.getActivityData(this.chip_id);
    //const max = data[data.length - 1].timestamp;
    const nowHour = new Date();
    nowHour.setMinutes(0);
    nowHour.setSeconds(0);
    nowHour.setMilliseconds(0);
    const max = nowHour.valueOf();
    const min = max - 23 * 60 * 60 * 1000;
    const binSize = 1 * 60 * 60 * 1000;
    let bins = [];
    for (let x = min; x <= max; x += binSize) {
      const subset = data.filter(
        (d) => d.timestamp >= x && d.timestamp < x + binSize
      );
      bins.push({
        timestamp: x,
        magnitude: subset.reduce((acc, cur) => acc + cur.magnitude, 0),
      });
    }
    console.log(nowHour);
    console.log(max);
    console.log(min, max);
    console.log(bins);
    this.chart = new Chart('activitydata', {
      type: 'bar',
      data: {
        datasets: [
          {
            label: 'Aktivitet',
            data: bins.map((row) => ({
              x: row.timestamp,
              y: row.magnitude,
            })),
          },
        ],
      },
      options: {
        parsing: false,
        scales: {
          x: {
            max: max,
            min: min,
            type: 'time',
            adapters: {
              date: {
                locale: nb,
              },
            },
            time: {
              unit: 'hour',
              displayFormats: {
                millisecond: 'HH:mm:ss.SSS',
                second: 'HH:mm:ss',
                minute: 'HH:mm',
                hour: 'HH:mm',
              },
            },
          },
          y: {
            display: false,
          },
        },
      },
    });
  }

  ngOnInit(): void {
    this.createChart();
  }
}
