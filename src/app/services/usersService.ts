import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { User } from "../modules/user";

@Injectable({providedIn: 'root'})
export class usersService{
    users:User[] = [];
    currentUser:User;
    usersToggled = new Subject<boolean>();
    constructor(private http: HttpClient){
        this.fetchUsers().subscribe(users => this.users = users);
    }

    fetchUsers(){
        return this.http.get<User[]>("assets/users.json");
    }
    
}