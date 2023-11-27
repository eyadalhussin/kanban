import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Ticket } from '../modules/ticket';
import { TicketList } from '../modules/ticketList';
import { dragService } from '../services/dragService';
import { pop } from '../shared/animationsModule';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  animations: [pop]
})
export class ProjectListComponent implements OnInit {
  @Input('list') list: TicketList;
  newTicket: boolean = false;
  editContainer: boolean = false;
  colorSelected = 10;
  colors: string[] = ['#0275d8', '#5cb85c', '#5bc0de', '#f0ad4e', '#d9534f', '#f7f7f7'];
  dragContainerID: number;
  insertID = -1;
  lastID = -1;

  constructor() { }

  ngOnInit(): void {
  }

  toggleNewTicket() {
    this.newTicket = true;
    setTimeout(() => {
      let input = document.querySelector('.ticketNameInput') as HTMLInputElement;
      input.focus();
    }, 100);
  }

  addNewTicket(ticketNameInput: HTMLInputElement) {
    this.list.tickets.push(new Ticket(this.list.tickets.length, ticketNameInput.value, this.list.id));
    this.newTicket = false;
  }

  closeNewTicket(ticketNameInput: HTMLInputElement) {
    ticketNameInput.value = "";
    this.newTicket = false;
  }

  toggleEdit() {
    for (let i = 0; i < this.colors.length; i++) {
      if (this.list.color == this.colors[i]) this.colorSelected = i;
    }
    this.editContainer = !this.editContainer;
  }

  toggleEditDiv(event, div) {
    if (event.target != div) return;
    this.editContainer = !this.editContainer;
  }

  setColorSelected(i) {
    this.colorSelected = i;
  }

  applyChanges(ticketNameInput: HTMLInputElement) {
    if (ticketNameInput.value != "") {
      this.list.name = ticketNameInput.value;
    }
    this.list.color = this.colors[this.colorSelected];
    this.editContainer = false;
  }

  drop(event: CdkDragDrop<Ticket[]>){
    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    this.list.tickets.forEach(ticket => {
      ticket.listID = this.list.id;
    })
  }



}
