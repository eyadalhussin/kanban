import { Component, OnInit } from '@angular/core';
import { boardService } from 'src/app/services/boardService';
import { projectsService } from 'src/app/services/projectsService';

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.css']
})
export class NewBoardComponent implements OnInit {
  projectNameExists:boolean = false;
  projectNames:string[] = [];
  constructor(private boardService:boardService, private projectsService: projectsService) { }

  ngOnInit(): void {
    this.projectsService.getProjects().forEach(project => {
      this.projectNames.push(project.name);
    })
  }

  addNewBoard(boardName: HTMLInputElement){
    if(this.projectNames.includes(boardName.value)){
      this.projectNameExists = true;
      return;
    } 
    this.projectsService.addNewProject(boardName.value);
    this.boardService.newBoard.next(false);
  }

  closeBoard(){
    this.boardService.newBoard.next(false);
  }

  closeBoardDiv(event, form){
    if(event.target !=  form) return;
    this.boardService.newBoard.next(false);
  }

}
