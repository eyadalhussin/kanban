import { Component, Input, OnInit } from '@angular/core';
import { CheckItem } from 'src/app/modules/checkItem';
import { Ticket } from 'src/app/modules/ticket';

@Component({
  selector: 'app-ticket-checklist',
  templateUrl: './ticket-checklist.component.html',
  styleUrls: ['./ticket-checklist.component.css']
})
export class TicketChecklistComponent implements OnInit {
  @Input('ticket') ticket:Ticket;
  constructor() { }

  ngOnInit(): void {
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

  addCheckListItemInput(e) {
    if (e.keyCode == '13') {
      this.addCheckListItem(e.target);
    }
  }

  addCheckListItem(input: HTMLInputElement) {
    if (input.value !== '')
      this.ticket.checkList.push(new CheckItem(input.value, false));
    input.value = "";
  }

  preventNewLine(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  }

  setCheckBox(index: number) {
    this.ticket.checkList[index].checked = !this.ticket.checkList[index].checked;
  }

  removeCheckItem(index: number) {
    this.ticket.checkList.splice(index, 1);
  }

}
