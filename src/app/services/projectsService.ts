import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tick } from "@angular/core/testing";
import { Subject } from "rxjs";
import { Project } from "../modules/project";
import { TicketList } from "../modules/ticketList";
import { User } from "../modules/user";

@Injectable({providedIn: 'root'})
export class projectsService{
    private projects:Project[] = [];
    projectsUpdated = new Subject<boolean>();
    activeProject:Project;

    constructor(private http:HttpClient){}

    getProjects(){
        return this.projects;
    }

    getCurrentProject(){
        return this.activeProject;
    }

    fetchProjects(){
        this.http.get<Project[]>("assets/projects.json").subscribe(erg => {
            this.projects = erg;
            this.activeProject = this.projects[0];
            // this.lists = this.projects[0].lists;
            this.projectsUpdated.next(true);
        })
    }

    deleteTicket(listID:number, ticketName:string){
        let index = 0;
        for(let i = 0; i < this.activeProject.lists[listID].tickets.length; i++){
            if(this.activeProject.lists[listID].tickets[i].name == ticketName){
                index = i;
                break;
            }
        }
        this.activeProject.lists[listID].tickets.splice(index, 1);
        this.projectsUpdated.next(true);
    }

    addNewList(listName:string){
        this.activeProject.lists.push(new TicketList(this.activeProject.lists.length, listName));
        this.projectsUpdated.next(true);
    }

    updateList(ticketName: string, oldList:number, newlist:number){
        let ticketIndex = 0;
        for(let i = 0; i < this.activeProject.lists[oldList].tickets.length; i++){
            if(this.activeProject.lists[oldList].tickets[i].name == ticketName) ticketIndex = i;
        }
        this.activeProject.lists[newlist].tickets.push(this.activeProject.lists[oldList].tickets[ticketIndex]);
        this.activeProject.lists[oldList].tickets.splice(ticketIndex, 1);
        this.projectsUpdated.next(true);
    }

    addNewProject(name:string){
        this.projects.push(new Project(this.projects.length, name));
        this.projects[this.projects.length-1].users.push(new User(0, "Max", "Muster", "#5cb85c"));
        this.projectsUpdated.next(true);
    }

    setActiveProject(index: number){
        this.activeProject = this.projects[index];
        this.projectsUpdated.next(true);
    }
}