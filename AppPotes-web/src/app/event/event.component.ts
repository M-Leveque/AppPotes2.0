import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  event : any;
  countDown : any;
  counter : any;

  constructor(private eventService : EventService, private router: ActivatedRoute) { }

  ngOnInit() {
    let idEvent = this.router.snapshot.params['id'];
    this.event = this.eventService.get(idEvent);
    this.counter = {day: 0, hour : 0};
    this.countDown = interval(1000);
    this.countDown.subscribe(
      (value) => {
        let count = Math.floor(this.event.date - Date.now());
        this.toDayHour(count);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('Observable done');
      }
    );
  } 


  private toDayHour(counter : number){
    // 1h = 3600000  | 1j = 86400000 
    let day = Math.round(counter / 86400000);
    let dayR = counter % 86400000;
    let hour = Math.round(dayR / 3600000 );
    this.counter.day = day;
    this.counter.hour = hour;
  }
}