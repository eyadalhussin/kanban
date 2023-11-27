import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CheckItem } from '../modules/checkItem';
import { Ticket } from '../modules/ticket';
import { userComment } from '../modules/userComment';
import { projectsService } from '../services/projectsService';
import { ticketService } from '../services/ticketService';
import { pop } from '../shared/animationsModule';
@Component({
  selector: 'app-project-ticket-full',
  templateUrl: './project-ticket-full.component.html',
  styleUrls: ['./project-ticket-full.component.css'],
  animations: [pop]
})
export class ProjectTicketFullComponent implements OnInit {

  checkItem1: boolean = true;

  avilableOptions: string[] = [];

  @Input('ticket') ticket:Ticket;
  @ViewChild('ticketName', {static : true}) ticketName: ElementRef;
  tmpTicket:Ticket;

  commentsShown:boolean = false;

  confirmation:string = "";
  deleteConfirmation:string = "";

  ticketEdit:boolean = false;

  constructor(private ticketService: ticketService, private projectsService: projectsService) { }

  ngOnInit(): void {
    this.copyTicket();
  }

  discardChanges(){
    this.confirmation = 'confirming';
  }
  
  closeTicket(){
    this.ticketService.closeTicket();
  }

  cancel(){
    this.confirmation = "";
  }

  copyTicket(){
    this.tmpTicket = new Ticket(this.ticket.id,this.ticket.name, this.ticket.listID, this.ticket
      .users, this.ticket.description, this.ticket.date);
      this.tmpTicket.checkList = this.ticket.checkList.slice();
      this.tmpTicket.comments = this.ticket.comments.slice();
  }

  updateTicketName(input: HTMLInputElement){
    this.tmpTicket.name = input.value;
  }

  apply(){
    this.ticket.name = this.tmpTicket.name;
    this.ticket.users = this.tmpTicket.users;
    this.ticket.date = this.tmpTicket.date;
    this.ticket.description = this.tmpTicket.description;
    this.ticket.checkList = this.tmpTicket.checkList.slice();
    this.ticket.comments = this.tmpTicket.comments.slice();
    if(this.tmpTicket.listID !== this.ticket.listID) 
    {
      this.projectsService.updateList(this.ticket.name, this.ticket.listID, this.tmpTicket.listID);
      this.ticket.listID = this.tmpTicket.listID;
    }
    this.closeTicket();
  }

  toggleDeleteConfirmation(){
    this.deleteConfirmation = "confirming";
  }

  cancelDelete(){
    this.deleteConfirmation = "";
  }

  deleteTicket(){
    this.ticketService.editMode.next(false);
    this.projectsService.deleteTicket(this.ticket.listID, this.ticket.name);
  }

  toggleEdit(){
    this.ticketEdit = !this.ticketEdit;
  }

  closeEdit(){
    setTimeout(() => {
      this.ticketEdit = false;
    }, 100);
  }

  renameTicket(){
    let input =  document.querySelector('.ticketNameInput') as HTMLInputElement;
    input.focus();    
  }

}
