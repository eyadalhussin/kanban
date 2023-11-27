import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ticket } from '../modules/ticket';
import { boardService } from '../services/boardService';
import { ticketService } from '../services/ticketService';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  editMode:boolean = false;
  editSubscription:Subscription;
  activeTicket:Ticket;
  newBoard:boolean = false;
  loadingState:string = "visible";
  isLoading:boolean = true;

  constructor(private ticketService: ticketService, private boardService:boardService) { }

  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    this.editSubscription = this.ticketService.editMode.subscribe(erg => {
      if(erg){
        this.activeTicket = this.ticketService.getTicket();
        this.editMode = true;
      } else {
        this.editMode = false;
      }
    })

    this.boardService.newBoard.subscribe(erg => {
      this.newBoard = erg;
    })

    this.loadingState = 'hidden';
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }


}
