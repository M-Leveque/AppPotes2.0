export class EventService {
    events = [
        {
          id: 1,
          title: 'Event1',
          description: 'Event1 description',
          icon: '🎁',
          date: Date.parse('12-06-2019'),
          dateCreation: Date.parse('03-26-2019')
        },
        {
          id: 2,
          title: 'Event2',
          description: 'Event2 description',
          icon: '👍',
          date: Date.parse('02-05-2017'),
          dateCreation: Date.parse('02-20-2017')
        },
        {
          id: 3,
          title: 'Event3',
          description: 'Event3 description',
          icon: '🥐',
          date: Date.parse('05-06-2019'),
          dateCreation: Date.parse('01-17-2019')
        }
    ];

    public get(id : number){
      return this.events.find((event) => { 
        return event.id == id;
      });
    } 
}