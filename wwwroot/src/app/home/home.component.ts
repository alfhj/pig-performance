import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import {AddPostService} from '../add-post.service';
// import {Observable} from 'rxjs';
// import {PostPayload} from '../add-post/post-payload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  // posts: Observable<Array<PostPayload>>;
  // constructor(private postService: AddPostService) { }

  // ngOnInit() {
  //   this.posts = this.postService.getAllPosts();
  // }

  // Fjern denne under

  constructor(private router: Router) {
    console.log('hey')
  };

  // Denne kan ta inn ID som parameter og navigere videre.
  // Mellomlagre ID for å hente korrekt data
  public viewInfoPage() {
    this.router.navigateByUrl('info-page')
  }

}
