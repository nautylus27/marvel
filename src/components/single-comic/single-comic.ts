import { Component, Input, OnInit } from '@angular/core';

/**
 * Generated class for the SingleComicComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'single-comic',
  templateUrl: 'single-comic.html'
})
export class SingleComicComponent implements OnInit {

  text: string;

  @Input()
  comic: any

  constructor() {
  }

  ngOnInit() { 
   }

}
