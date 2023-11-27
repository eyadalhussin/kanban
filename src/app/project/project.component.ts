import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from '../modules/project';
import { User } from '../modules/user';
import { animationService } from '../services/animationService';
import { projectsService } from '../services/projectsService';
import { usersService } from '../services/usersService';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnDestroy {
  sidebarState = 'open';
  sidebarSubscription: Subscription;
  activeProjectSubscription: Subscription;
  projectsSubscription: Subscription;
  project: Project;
  isLoading: boolean = true;
  newList: boolean = false;
  usersToggled: boolean = false;
  clientWidth : number;

  availableUsers: User[] = [];
  selectedUsers: number[] = [];
  tmpSelectedUsers: number[] = [];

  constructor(private animationService: animationService, private projectsService: projectsService, private usersService: usersService) { }

  ngOnDestroy(): void {
    this.sidebarSubscription.unsubscribe();
    this.activeProjectSubscription.unsubscribe();
  }

  ngOnInit(): void {
    //Sidebarstate
    this.sidebarSubscription = this.animationService.sidebarState.subscribe(erg => this.sidebarState = erg);


    //TODO ,  get active project
    setTimeout(() => {
      this.project = this.projectsService.getCurrentProject();
      this.initUsers();
      this.isLoading = false;
    }, 500);

    //Notify whenever a Project is changed
    this.projectsSubscription = this.projectsService.projectsUpdated.subscribe(erg => {
      if (erg) {
        this.project = this.projectsService.getCurrentProject();
        this.initUsers();
      }
    })

    this.usersService.fetchUsers().subscribe(erg => {
      this.availableUsers = erg;
    });

    this.usersService.usersToggled.subscribe(erg => this.usersToggled = erg);

    this.clientWidth = window.innerWidth;
  }

  initUsers(){
    this.selectedUsers = [];
    this.project.users.forEach(user => {
      this.availableUsers.forEach(availableUser => {
        if(user.id == availableUser.id) this.selectedUsers.push(user.id);
      })
    })
  }

  checkUser(id: number){
    if(id == 0) return;
    for(let i = 0; i < this.selectedUsers.length; i++){
      if(this.selectedUsers[i] == id) {
        this.selectedUsers.splice(i, 1);
        return;
      }
    }
    this.selectedUsers.push(id);
  }

  applyUsers(){
    this.project.users = [];
    this.selectedUsers.forEach(id => {
      this.project.users.push(this.availableUsers[id]);
    })
    this.usersService.usersToggled.next(false);
  }

  openSidebar() {
    this.animationService.sidebarState.next('open');
  }

  toggleNewList() {
    this.newList = !this.newList;
  }

  addNewList(listNameInput: HTMLInputElement) {
    if (listNameInput.value == "") return;
    this.projectsService.addNewList(listNameInput.value);
    this.newList = false;
  }

  cancelUsers() {
    this.selectedUsers = [...this.tmpSelectedUsers];
    this.usersService.usersToggled.next(false);
  }
  
  toggleUsers() {
    this.tmpSelectedUsers = [...this.selectedUsers];
    this.usersService.usersToggled.next(true);
  }

  getWidthState(){
    if(this.sidebarState == 'open' && this.clientWidth < 480) return false;
    return true;
  }

}
