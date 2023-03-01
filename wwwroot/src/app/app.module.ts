import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
// import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
// import {AddPostComponent} from './add-post/add-post.component';
// import {PostComponent} from './post/post.component';

// HeaderComponent,
// AddPostComponent,
// PostComponent

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
