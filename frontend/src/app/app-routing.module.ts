import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventCreateComponent } from './event-create/event-create.component';

const routes: Routes = [
	{ path:  '', redirectTo:  'accounts', pathMatch:  'full' },
	{
	    path:  'events',
	    component:  EventListComponent
	},
	{
	    path:  'create-event',
	    component: EventCreateComponent
	}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
