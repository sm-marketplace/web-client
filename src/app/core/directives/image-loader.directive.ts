// from: https://stackoverflow.com/questions/43301624/angular-img-loading-directive

import {
  Directive,
  Attribute,
  Renderer2,
  ElementRef,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appImageLoader]'
})
export class ImageLoaderDirective {

  // TODO: descargar los ficheros y llamarlos localmente desde /assets
  defaultLoaderSrc = 'https://v.fastcdn.co/u/430e104e/57579327-0-Loaders-3.svg';
  defaultErrorSrc = 'https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg';

  constructor(
    @Attribute('loader') public loader: string,
    @Attribute('onErrorSrc') public onErrorSrc: string,
    private renderer: Renderer2,
    private el: ElementRef) {
    // this.renderer.setAttribute(this.el.nativeElement, 'src', this.loader || this.defaultLoaderSrc);
  }

  // @HostListener('load') onLoad() {
  //   this.renderer.setAttribute(this.el.nativeElement, 'src', this.el.nativeElement.src);
  // }
  @HostListener('error') onError() {
    this.renderer.setAttribute(this.el.nativeElement, 'src', this.onErrorSrc || this.defaultErrorSrc);
  }
}
