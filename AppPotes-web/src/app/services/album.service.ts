export class AlbumService {
  sharedAlbum = {
      id: 0,
      title: 'Album commun',
      path: 'vrac.jpg',
      pictures: [
        { id: 0, path: 'img01.jpg'},
        { id: 1, path: 'img02.jpg' },
      ] 
    }
  
  albums = [
    {
      id: 1,
      title: 'Randonnée 2018',
      path: 'montagne.jpg',
      pictures: [
        { id: 0, path: 'img01.jpg'},
        { id: 1, path: 'img02.jpg' },
        { id: 3, path: 'img04.jpg' },
      ]      
    },
    {
      id: 2,
      title: 'Concert 2017',
      path: 'pink-floyd.jpg',
      pictures: [
        { id: 0, path: 'img01.jpg'},
        { id: 2, path: 'img03.jpg' },
        { id: 3, path: 'img04.jpg' },
      ]   
    },
    {
      id: 3,
      title: 'Vancance 2016',
      path: 'plage.jpg',
      pictures: [
        { id: 0, path: 'img01.jpg'},
        { id: 1, path: 'img02.jpg' },
        { id: 2, path: 'img03.jpg' },
      ]   
    }
  ];

  public get(id : number){
    if(id == 0){
      return this.sharedAlbum;
    } else {
      return this.albums.find((album) => { 
        return album.id == id;
      });
    } 
  }
}