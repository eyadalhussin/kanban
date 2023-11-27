import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from 'src/app/modules/ticket';
import { User } from 'src/app/modules/user';
import { projectsService } from 'src/app/services/projectsService';

@Component({
  selector: 'app-ticket-users',
  templateUrl: './ticket-users.component.html',
  styleUrls: ['./ticket-users.component.css']
})
export class TicketUsersComponent implements OnInit {
  @Input('ticket') ticket: Ticket;
  avilableUsers: User[] = [];
  selectedUsers: User[] = [];
  usersToggled:boolean = false;

  constructor(private projecsService: projectsService) { }

  ngOnInit(): void {
    this.avilableUsers = this.projecsService.getCurrentProject().users;
  }

  addUser(user: User){
    if(!this.ticket.users.includes(user)){
      this.ticket.users.push(user);
    }
  }

  removeUser(user: User){
    let index = -1;
    for(let i =0; i < this.ticket.users.length; i++){
      if(this.ticket.users[i].id == user.id) index = i;
    }
    this.ticket.users.splice(index, 1);
  }

  toggleUsers(){
    this.usersToggled = !this.usersToggled;
  }

}
