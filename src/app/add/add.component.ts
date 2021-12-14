import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  postForm!: FormGroup;

  constructor(private fb: FormBuilder, private service: PostService, private router: Router) {
  }

  ngOnInit(): void {
    this.buildForm()

  }

  buildForm() {
    this.postForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [ Validators.required]),
      date: new FormControl(new Date)
    })
  }

  saveClick() {
    this.service.createPost(this.postForm.value).subscribe(res=> {
      this.service.getPosts()
      this.router.navigateByUrl('/list')
    })

  }
  public checkError = (controlName: string, errorName: string) => {
    return this.postForm.controls[controlName].hasError(errorName);
  }
}
