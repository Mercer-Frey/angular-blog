import { PostsService } from '../../shared/services/posts.service'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Post } from 'src/app/shared/interfaces'
import { Subscription } from 'rxjs'
import { AlertService } from '../shared/services/alert.service'

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = []
  subPosts: Subscription
  subRemove: Subscription
  searchStr = ''
  constructor(private postsS: PostsService, private alertS: AlertService) {}

  ngOnInit(): void {
    this.subPosts = this.postsS.getAll().subscribe((posts) => {
      this.posts = posts
    })
  }
  ngOnDestroy() {
    if (this.subPosts) {
      this.subPosts.unsubscribe()
    }
    if (this.subRemove) {
      this.subRemove.unsubscribe()
    }
  }
  remove(id: string) {
    this.subRemove = this.postsS.remove(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id)
      this.alertS.warning('Post was deleted')
    })
  }
}
