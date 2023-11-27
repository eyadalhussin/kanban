import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from 'src/app/modules/ticket';
import { userComment } from 'src/app/modules/userComment';
import { pop } from 'src/app/shared/animationsModule';

@Component({
  selector: 'app-ticket-comment',
  templateUrl: './ticket-comment.component.html',
  styleUrls: ['./ticket-comment.component.css'],
  animations: [pop]
})
export class TicketCommentComponent implements OnInit {
  @Input('ticket') ticket:Ticket;
  commentsShown:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onComment(input: HTMLInputElement, event) {
    if (event.keyCode == "13") {
      if (input.value == "") return;
      this.addComment(input);
    }
  }

  addComment(input: HTMLInputElement) {
    if (input.value === "") return;
    this.ticket.comments.push(new userComment("Max Muster", new Date(), input.value));
    input.value = "";
  }

  toggleCommentsShown(){
    this.commentsShown = !this.commentsShown;
  }

  formatDate(date: Date) {
    let year = date.getFullYear();
    let month = date.getMonth().toString();
    let day = date.getDay().toString();
    let hours = date.getHours();
    let minutes = date.getMinutes().toString();
    if (+month < 10) month = "0" + month;
    if (+day < 10) day = "0" + day;
    if (+minutes < 10) minutes = "0" + minutes;
    return day + "." + month + "." + year + " at " + hours + ":" + minutes;
  }

}
