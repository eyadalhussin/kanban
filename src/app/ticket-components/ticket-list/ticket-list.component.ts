import { Component, Input, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Ticket } from 'src/app/modules/ticket';
import { TicketList } from 'src/app/modules/ticketList';
import { projectsService } from 'src/app/services/projectsService';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  @Input('ticket') ticket:Ticket;
  lists:TicketList[];


  constructor(private projectsService: projectsService) { }

  ngOnInit(): void {
    this.lists = this.projectsService.activeProject.lists;
  }

  updateList(listOptions: HTMLSelectElement){
    // this.ticket.listID = +listOptions.value;
    let listIndex = 0;
    for(let i = 0; i < this.lists.length; i++){
      if(this.lists[i].name === listOptions.value) listIndex = i;
    }
    this.ticket.listID = listIndex;    
  }

}
