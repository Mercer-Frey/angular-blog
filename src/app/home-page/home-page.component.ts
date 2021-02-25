import { Observable } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { PostsService } from '../shared/services/posts.service'
import { Post } from '../shared/interfaces'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  posts$: Observable<Post[]>
  constructor(private postsS: PostsService) {}

  ngOnInit(): void {
    this.posts$ = this.postsS.getAll()
  }
}
