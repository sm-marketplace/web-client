import { Observable, Observer } from 'rxjs';
export class NgAudio {
  
  private audio = new Audio();

  time$ = new Observable((o: Observer<number>) => {
    this.audio.addEventListener('timeupdate', (ev: Event) => {
      o.next(this.audio.currentTime)
    })
  });

  playing$ = new Observable((o: Observer<boolean>) => {
    this.audio.addEventListener('playing', (ev: Event) => {
      o.next(true)
    })
    this.audio.addEventListener('pause', (ev: Event) => {
      o.next(false)
    })
    this.audio.addEventListener('ended', (ev: Event) => {
      o.next(false)
    })
  })

  ended$ = new Observable((o: Observer<boolean>) => {
    this.audio.addEventListener('playing', (ev: Event) => {
      o.next(false)
    })
    this.audio.addEventListener('ended', (ev: Event) => {
      o.next(true)
    })
  })

  constructor() {}

  load(src: string) {
    this.audio.pause();
    this.audio.src = src;
    this.audio.load();
    this.audio.play();
  }

  play(){ this.audio.play(); }
  
  pause(){ this.audio.pause(); }

  get duration(){
    return this.audio.duration;
  }

  setVolume(volume: number) {
    this.audio.volume = volume;
  }

  private on(event: keyof HTMLMediaElementEventMap) {

  }
}