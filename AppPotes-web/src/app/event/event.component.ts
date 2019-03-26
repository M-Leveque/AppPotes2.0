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
  counter : Date;

  constructor(private eventService : EventService, private router: ActivatedRoute) { }

  ngOnInit() {
    let idEvent = this.router.snapshot.params['id'];
    this.event = this.eventService.get(idEvent);
    this.countDown = interval(1000);
    this.countDown.subscribe(
      (value) => {
        let timeDiff = Math.floor((this.event.date - new Date().getTime()) / 1000);
        this.counter = new Date(this.counter);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('Observable done');
      }
    );
  } 
}