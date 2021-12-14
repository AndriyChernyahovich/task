import {Component, OnInit} from '@angular/core';
import {Post} from "../model";
import {PostService} from "../post.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  posts: Post[] = []
  similarPost : any[]=[]
  isShow = false;
  searchDes = ''

  index = 0;
  btnClass: any;
  iptClass:any;


  btnClickHandler() {
    if(this.btnClass) {
      this.btnClass  = '';
      this.iptClass  = '';
    } else {
      this.btnClass = 'close'
      this.iptClass = 'square'

    }
  }


  constructor(private service: PostService, private router: Router, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getPosts()
  }

  getPosts() {
    this.service.getPosts().subscribe(res => this.posts = this.service.test = res)
  }

  deletePost(post: Post) {
    this.service.deletePost(post.id).subscribe(()=> {
      this.getPosts()
    })
  }

  toggleView(post: Post, i:number) {
    post.similarPost = []
   const elem = this.posts.find(item => item.id === i)
    if (elem) {
      this.checkSimilarPosts(post)
      elem.showInfo = !elem.showInfo

    }

  }

  openEdit(post: Post){
    if (post.id != null) {
      this.service.getPostById(post.id).subscribe(res =>{
        this.service.selectedEditPost = res
        this.router.navigateByUrl('/edit')
      })
    }
  }

  checkSimilarPosts(post:Post){
    const {title,description} = post
    const titleWords = title.split(' ').map(item=> item.toLowerCase())
    const descriptionWords = description.split(' ').map(item=> item.toLowerCase())
    console.log(post.similarPost)
    this.posts.forEach((el:any)=>{
      if(el.id !== post.id){
        let findDuplicates = (arr:any) => arr.filter((item:any, index:number) => {
          item.toLowerCase()
         return arr.indexOf(item) != index
        })
        const duplicateTitle =  findDuplicates([...new Set(el.title.split(' ')),...new Set(titleWords)])
        const duplicateDesc = findDuplicates([...new Set(el.description.split(' ')), ...new Set(descriptionWords)])
        if((duplicateTitle.length || duplicateDesc.length) && post.similarPost.length < 3){
             // this.similarPost.push(el)
          post.similarPost.push(el)

          console.log(duplicateTitle)
          console.log(duplicateDesc)
        }
      }
    })
  }
}

