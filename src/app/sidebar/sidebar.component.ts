import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from '../modules/project';
import { animationService } from '../services/animationService';
import { boardService } from '../services/boardService';
import { projectsService } from '../services/projectsService';
import { ticketService } from '../services/ticketService';
import { pop, slide } from '../shared/animationsModule';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [slide, pop]
})
export class SidebarComponent implements OnInit, OnDestroy {

  sideBarState = 'open';
  animationSubscription : Subscription;
  projectsSubscription:Subscription;
  projects:Project[] = [];
  activeProjectIndex = 0;
  creatingNewBoard:boolean = false;

  constructor(private animationService: animationService, private projectsService: projectsService, private boardService:boardService) { }

  ngOnDestroy(): void {
    this.animationSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.projectsService.fetchProjects();
    this.animationSubscription = this.animationService.sidebarState.subscribe(erg => {
      this.sideBarState = erg;
    })
    //Fetching the projects
    this.projectsSubscription = this.projectsService.projectsUpdated.subscribe(erg => {
      if(erg) this.projects = this.projectsService.getProjects();
    })

  }

  setActiveProject(index:number){
    // this.projectsService.activeProject  = (this.projectsService.getProjects()[index]);
    // this.activeProjectIndex = index;
    this.projectsService.setActiveProject(index);
    this.activeProjectIndex = index;
  }

  closeSidebar(){
    this.animationService.sidebarState.next('closed');
  }

  toggleNewBoard(){
    this.boardService.newBoard.next(true);
  }

}
