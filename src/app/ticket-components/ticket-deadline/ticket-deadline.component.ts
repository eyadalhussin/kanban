import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Ticket } from 'src/app/modules/ticket';
import { pop } from 'src/app/shared/animationsModule';

@Component({
  selector: 'app-ticket-deadline',
  templateUrl: './ticket-deadline.component.html',
  styleUrls: ['./ticket-deadline.component.css'],
  animations: [pop]
})
export class TicketDeadlineComponent implements OnInit {
  @Input('ticket') ticket:Ticket;

  constructor() { }

  ngOnInit(): void {
    this.setDate();
  }

  toggleDeadline() {
    this.ticket.date === "" ? this.ticket.date = " " : this.ticket.date = "";
  }

  updateDeadline(deadlineInput: HTMLInputElement){
    this.ticket.date = deadlineInput.value;
  }

  setDate(){
    if(this.ticket.date){
      let date = this.ticket.date;      
      let newDate = date.substring(0,4)+"-"+date.substring(5,7)+"-"+date.substring(8,10);
      setTimeout(() => {
        let dateInput = document.querySelector('.dateInput') as HTMLInputElement;
        dateInput.value = newDate;
      }, 100);
    }
  }
}
