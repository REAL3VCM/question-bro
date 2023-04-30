import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { QuestionManagementComponent } from './pages/question-management/question-management.component';
import { CreateQuestionComponent } from './pages/create-question/create-question.component';
import { QuestionEditComponent } from './pages/question-edit/question-edit.component';
import { QuestionListComponent } from './pages/question-list/question-list.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { SortByDatePipe } from './pipes/sort-by-date.pipe';

const routes: Routes = [
  { path: '', redirectTo: '/question-management', pathMatch: 'full' },
  { path: 'question-management', component: QuestionManagementComponent },
  { path: 'create-question', component: CreateQuestionComponent },
  { path: 'question-edit/:id', component: QuestionEditComponent },
  { path: 'question-list', component: QuestionListComponent },
];


@NgModule({

  declarations: [
    AppComponent,
    QuestionManagementComponent,
    CreateQuestionComponent,
    QuestionEditComponent,
    QuestionListComponent,
    SortByDatePipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
