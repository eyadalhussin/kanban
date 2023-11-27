import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Project } from "../modules/project";
import { Ticket } from "../modules/ticket";

@Injectable({ providedIn: 'root' })
export class ticketService {
    private activeTicket: Ticket;
    editMode = new Subject<boolean>();

    constructor() {
    }

    getTicket() {
        return this.activeTicket;
    }

    setTicket(ticket: Ticket) {
        if (ticket) {
            this.activeTicket = ticket;
            this.editMode.next(true);
        }
    }

    closeTicket(){
        this.editMode.next(false);
    }



}