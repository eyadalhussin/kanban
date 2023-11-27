import { CheckItem } from "./checkItem";
import { User } from "./user";
import { userComment } from "./userComment";
export class Ticket{
    constructor(
        public id:number,
        public name:string,
        public listID:number,
        public users: User[] = [],
        public description:string = "",
        public date:string = "",
        public checkList:CheckItem[] = [],
        public comments:userComment[] = []
        ){}
}