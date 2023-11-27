import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css'],
  animations:[trigger('fadeOut', [
    state('visible', style({
      opacity : 1
    })),
    state('hidden', style({
      opacity : 0
    })),
    transition('visible <=> hidden', animate(500))
  ])]
})
export class LoadingScreenComponent implements OnInit {
  @Input('loadingState') loadingState:string = "visible";

  ngOnInit(){
    setTimeout(() => {
      this.loadingState = "hidden";
    }, 1000);
  }

}
