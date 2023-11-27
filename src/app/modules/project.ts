import { TicketList } from "./ticketList";
import { User } from "./user";

export class Project{
    constructor(
        public id: number,
        public name: string,
        public lists: TicketList[] = [],
        public users: User[] = []
    ){}
}