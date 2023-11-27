import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ProjectComponent } from './project/project.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectTicketComponent } from './project-ticket/project-ticket.component';
import { ProjectTicketFullComponent } from './project-ticket-full/project-ticket-full.component';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { TicketCommentComponent } from './ticket-components/ticket-comment/ticket-comment.component';
import { TicketChecklistComponent } from './ticket-components/ticket-checklist/ticket-checklist.component';
import { TicketUsersComponent } from './ticket-components/ticket-users/ticket-users.component';
import { TicketDescriptionComponent } from './ticket-components/ticket-description/ticket-description.component';
import { TicketDeadlineComponent } from './ticket-components/ticket-deadline/ticket-deadline.component';
import { TicketListComponent } from './ticket-components/ticket-list/ticket-list.component';
import { NewBoardComponent } from './components/new-board/new-board.component';
import { FormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    SidebarComponent,
    ProjectListComponent,
    ProjectTicketComponent,
    ProjectTicketFullComponent,
    MainComponent,
     TicketCommentComponent,
     TicketChecklistComponent,
     TicketUsersComponent,
     TicketDescriptionComponent,
     TicketDeadlineComponent,
     TicketListComponent,
     NewBoardComponent,
     LoadingScreenComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
