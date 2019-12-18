import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  showPasteEvents = false;
  events : any[];
  today: number = Date.now();

  constructor(private eventService : EventService) { }

  ngOnInit() {
    this.events = this.eventService.events;
  }

  setShowPasteEvent(value : boolean){
    this.showPasteEvents = value;
  }

}
