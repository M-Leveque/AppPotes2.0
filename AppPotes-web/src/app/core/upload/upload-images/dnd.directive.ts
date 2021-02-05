import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {

  @Output() fileDropped = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void { 
    window.addEventListener("dragover", e => { 
    e && e.preventDefault(); 
    }, false); 
    window.addEventListener("drop", e => { 
    e && e.preventDefault(); 
    }, false); 
  } 

  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('dragleave', ['$event']) onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('drop', ['$event']) ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    var files = evt.dataTransfer.files;
    if(files.length > 0){
      this.fileDropped.emit(files);
    }
  }
}
