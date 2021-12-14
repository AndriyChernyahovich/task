import { Injectable } from '@angular/core';
import { Observable,throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {Post} from "./model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  selectedEditPost:any ={}
  posts: Observable<Post[]> = new Observable<Post[]>();
  test: Post[] = []

  private postUrl = 'api/posts/'

  constructor(private http: HttpClient) {}

  getPostById(postId: number) {
    return this.http.get<any[]>(this.postUrl + postId)
  }

  getPosts(): Observable<any> {
    this.posts = this.http.get<any[]>(this.postUrl).pipe(
      retry(2),
      catchError((err) => {
        return throwError(err)
      })
    )
    return this.posts
  }

  deletePost(idPost: number): Observable<any> {
    return this.http.delete(this.postUrl + idPost)
  }

  createPost(post: Post) {
    return this.http.post(this.postUrl, post)
  }

  editPost( post: Post) {
    return this.http.put(this.postUrl + post.id, post)
  }
}

