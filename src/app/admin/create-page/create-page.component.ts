import { PostsService } from '../../shared/services/posts.service'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Post } from '../../shared/interfaces'
import { AlertService } from '../shared/services/alert.service'

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {
  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private postsS: PostsService,
    private alertS: AlertService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: [null, Validators.required],
      text: [null, Validators.required],
      author: [null, Validators.required],
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const post: Post = {
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text,
      date: new Date(),
    }
    this.postsS.create(post).subscribe(() => {
      this.form.reset()
      this.alertS.success('Post Was created')
    })
  }
}
