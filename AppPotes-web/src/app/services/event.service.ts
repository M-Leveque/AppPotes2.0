export class EventService {
    events = [
        {
          id: 3,
          title: 'Event1',
          description: 'Event1 description',
          icon: '🎁',
          date: Date.parse('12-05-2019')
        },
        {
          title: 'Event2',
          description: 'Event2 description',
          icon: '👍',
          date: Date.parse('13-06-2017')
        },
        {
          title: 'Event3',
          description: 'Event3 description',
          icon: '🥐',
          date: Date.parse('14-07-2019')
        }
    ];
}