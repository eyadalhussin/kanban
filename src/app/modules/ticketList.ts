import { Ticket } from "./ticket";

export class TicketList{
    constructor(
        public id:number,
        public name:string,
        public tickets:Ticket[] = [],
        public color:string = "#ffffff"
    ){}
}