import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  albums = [
    {
      title: 'Randonnée',
      path: 'montagne.jpg'
    },
    {
      title: 'Concert',
      path: 'pink-floyd.jpg'
    },
    {
      title: 'Vancance 2016',
      path: 'plage.jpg'
    }
  ];

  events = [
    {
      title: 'Event1',
      description: 'Event1 description',
      icon: '🎁',
      date: '12-05-2019'
    },
    {
      title: 'Event2',
      description: 'Event2 description',
      icon: '👍',
      date: '13-06-2019'
    },
    {
      title: 'Event3',
      description: 'Event3 description',
      icon: '🥐',
      date: '14-07-2019'
    }
  ];

  pools = [
    {
      title: 'Pool1',
      description: 'Pool1 description',
      cash: 100,
      endDate: '14-07-2021'
    },
    {
      title: 'Pool2',
      description: 'Pool3 description',
      cash: 50,
      endDate: '14-07-2022'
    },
    {
      title: 'Pool3',
      description: 'Pool3 description',
      cash: 25,
      endDate: '14-07-2023'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
