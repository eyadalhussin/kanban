import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from 'src/app/modules/ticket';
import { pop } from 'src/app/shared/animationsModule';

@Component({
  selector: 'app-ticket-description',
  templateUrl: './ticket-description.component.html',
  styleUrls: ['./ticket-description.component.css'],
  animations: [pop]
})
export class TicketDescriptionComponent implements OnInit {
  @Input('ticket') ticket:Ticket;

  constructor() { }

  ngOnInit(): void {
  }

  toggleDescription() {
    this.ticket.description === "" ? this.ticket.description = " " : this.ticket.description = "";
  }

  updateDescription(description: HTMLTextAreaElement){
    this.ticket.description = description.value;
  }

}
