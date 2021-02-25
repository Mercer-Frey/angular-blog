import { PostsService } from '../../shared/services/posts.service'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { switchMap } from 'rxjs/operators'
import { Post } from 'src/app/shared/interfaces'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import { AlertService } from '../shared/services/alert.service'

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit, OnDestroy {
  form: FormGroup
  submitted = false
  post: Post
  subUpdate: Subscription
  constructor(
    private route: ActivatedRoute,
    private postsS: PostsService,
    private fb: FormBuilder,
    private alertS: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsS.getById(params['id'])
        })
      )
      .subscribe((post: Post) => {
        this.post = post
        this.form = this.fb.group({
          title: [post.title, Validators.required],
          text: [post.text, Validators.required],
        })
      })
  }
  submit() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true
    this.subUpdate = this.postsS
      .update({
        ...this.post,
        title: this.form.value.title,
        text: this.form.value.text,
      })
      .subscribe(() => {
        this.submitted = false
        this.alertS.success('Post wast updated')
      })
  }
  ngOnDestroy() {
    this.subUpdate.unsubscribe()
  }
}
