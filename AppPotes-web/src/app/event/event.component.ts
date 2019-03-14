import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  showPasteEvents = false;
  events : any[];
  date : number;

  constructor(private eventService : EventService) { }

  ngOnInit() {
    this.events = this.eventService.events;
    this.date = Date.now();
  }

  setShowPasteEvent(value : boolean){
    this.showPasteEvents = value;
  }

}
