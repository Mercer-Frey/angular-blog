import { Observable } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { Post } from '../shared/interfaces'
import { PostsService } from '../shared/services/posts.service'
import { ActivatedRoute, Params } from '@angular/router'
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  post$: Observable<Post>
  constructor(private postsS: PostsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.post$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsS.getById(params['id'])
      })
    )
  }
}
