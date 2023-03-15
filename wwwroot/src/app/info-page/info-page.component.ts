import {Component, OnInit} from '@angular/core';
// import {ActivatedRoute} from '@angular/router';
// import {AddPostService} from '../add-post.service';
// import {PostPayload} from '../add-post/post-payload';

// @ts-ignore
@Component({
  selector: 'app-post',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.css']
})
export class InfoPageComponent {
  // post: PostPayload;
  // permaLink: Number;

  // This in constructor:
  // private router: ActivatedRoute, private postService: AddPostService

  constructor() {
    console.log('hey 2')
  };

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

}
