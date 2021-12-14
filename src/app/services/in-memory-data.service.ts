import { Injectable } from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb() {

    const posts = [
      {id:0, title: 'Sale car', description: 'ford escort', date: new Date(), showInfo: false, similarPost:[]},
      {id:1, title: 'House sale', description: 'tech', date: new Date(), showInfo: false,similarPost:[]},
      {id:2, title: 'House buy', description: 'house with four rooms', date: new Date(), showInfo: false,similarPost:[]},
      {id:3, title: 'Wheels', description: 'wheels for car', date: new Date(), showInfo: false,similarPost:[]},
      {id:4, title: 'Car', description: 'wheels for ford', date: new Date(), showInfo: false,similarPost:[]},
    ];
    return {posts};
  }
}
