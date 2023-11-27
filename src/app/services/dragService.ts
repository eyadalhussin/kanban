import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ticket } from "../modules/ticket";

@Injectable({providedIn: 'root'})
export class dragService{
    draggedTicket:Ticket;

    ticketAdded:boolean = false;

    listID:number = -1;
    insertID = new Subject<number>();





    constructor() {}
}