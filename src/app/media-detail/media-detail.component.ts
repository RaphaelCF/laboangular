import { Component, OnInit, Input } from '@angular/core';
import { Media } from '../media';
import { KeepeekService } from '../keepeek.service';

@Component({
  selector: 'app-media-detail',
  templateUrl: './media-detail.component.html',
  styleUrls: ['./media-detail.component.css']
})
export class MediaDetailComponent implements OnInit {
	@Input() media: Media;
  private credit : string;

	constructor(private keepeekService: KeepeekService) {}

  ngOnInit() {
    this.credit = '';
    for (let i = 0; i < this.media._embedded.metadata.length; i++) {
        if (this.media._embedded.metadata[i].id == 'credit_juridique'){
          this.credit = this.media._embedded.metadata[i].value;
        }
    }
  }

  update(): void {
    this.keepeekService.updateMedia(this.media, this.credit).subscribe(any => any);
  }

}
