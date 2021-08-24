import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent implements OnInit {
  @Input()
  imgSrc: string = '../../assets/common/images/sampleProfilePics/sample-profile-01.jpg';

  @Input()
  altTxt?: string = 'Pondicherry French Hotel';

  @Input()
  figCaptionTxt?: string =
    'Test for Figure Caption';

  @Input()
  imgOpacity?: number = 1;

  constructor() {}

  ngOnInit(): void {}
}
