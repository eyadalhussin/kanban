import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ticket } from '../modules/ticket';
import { dragService } from '../services/dragService';
import { ticketService } from '../services/ticketService';

@Component({
  selector: 'app-project-ticket',
  templateUrl: './project-ticket.component.html',
  styleUrls: ['./project-ticket.component.css']
})
export class ProjectTicketComponent implements OnInit {

  @Input('ticket') ticket:Ticket;
  isDragging:boolean = false;

  projectsSubscription:Subscription;
  constructor(private ticketService : ticketService, private dragService:dragService) { }


  ngOnInit(): void {
  }

  setActiveTicket(){
    if(!this.isDragging){
      this.ticketService.setTicket(this.ticket);
    }
  }

  getDoneTasks(){
    let erg = 0;
    if(this.ticket.checkList != undefined){
      this.ticket.checkList.forEach(element => {
        if(element.checked) erg++;
      }) 
    }
    return erg;
  }

  onDragStarted(event: CdkDragStart){
    this.isDragging = true;
  }

  onDragEnded(event: CdkDragEnd){
    setTimeout(() => {
      this.isDragging = false;
    }, 100);
  }

}
