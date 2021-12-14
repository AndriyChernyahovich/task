import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../post.service";
import {Router} from "@angular/router";
import {Post} from "../model";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  postForm!: FormGroup;

  constructor(private fb: FormBuilder, private service: PostService,private router: Router) {
  }

  ngOnInit(): void {
    this.buildForm(this.service.selectedEditPost)
  }

  buildForm(selectedEditPost: Post) {
    this.postForm = this.fb.group({
      id:selectedEditPost.id,
      title: new FormControl(selectedEditPost.title,  Validators.required),
      description: new FormControl(selectedEditPost.description,  Validators.required),
      date: new FormControl(new Date)
    })
  }

  saveEdit() {
    this.service.editPost(this.postForm.value).subscribe(res=>{
      this.router.navigateByUrl('/list')
    })
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.postForm.controls[controlName].hasError(errorName);
  }
}
