import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import {ActivatedRoute} from '@angular/router';
// import {AddPostService} from '../add-post.service';
// import {PostPayload} from '../add-post/post-payload';

@Component({
  selector: 'app-info',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.css']
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

  constructor(private router: Router) {
    console.log('hey');
  };

  public viewHomePage() {
    this.router.navigateByUrl('home');
  }

}
