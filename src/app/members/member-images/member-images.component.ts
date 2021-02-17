import { Component, Input, OnInit } from '@angular/core';
import { Photo } from 'src/app/_models/photo';

@Component({
  selector: 'app-member-images',
  templateUrl: './member-images.component.html',
  styleUrls: ['./member-images.component.css'],
})
export class MemberImagesComponent implements OnInit {
  @Input()
  photos!: Photo[];
  currentImage: any;
  slideIndex = 1;

  constructor() {}

  ngOnInit(): void {
  }

  nextImage(image: any) {
    this.currentImage = image;
  }

  // Next/previous controls
  plusSlides(n: number) {
    this.showSlides((this.slideIndex += n));
  }

  // Thumbnail image controls
  currentSlide(n: number) {
    this.showSlides((this.slideIndex = n));
  }

  showSlides(n: number) {
    var i;
    var slides = document.getElementsByClassName('mySlides');
    var dots = document.getElementsByClassName('demo');
    var captionText = document.getElementById('caption');
    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].setAttribute('style', 'display:none');
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }

    if (slides.length > 0) {
      slides[this.slideIndex - 1].setAttribute('style', 'display:block');
    }

    if (dots.length > 0) {
      dots[this.slideIndex - 1].className += ' active';
      var innerHTML = dots[this.slideIndex - 1]?.getAttribute('alt');
      if(innerHTML && captionText){
        captionText.innerHTML = innerHTML;
      }
    }
    //
    //
  }
}
