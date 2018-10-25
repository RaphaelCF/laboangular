import { Component, OnInit, Input } from '@angular/core';
import { Media } from '../media';
import { KeepeekService } from '../keepeek.service';
import { FormControl, NgForm} from '@angular/forms';

@Component({
  selector: 'app-media-detail',
  templateUrl: './media-detail.component.html',
  styleUrls: ['./media-detail.component.css']
})
export class MediaDetailComponent implements OnInit {
	@Input() media: Media;
  credit = new FormControl('', [
  ]);

	constructor(private keepeekService: KeepeekService) {}

  ngOnInit() {
    this.credit.setValue("");
    for (let i = 0; i < this.media._embedded.metadata.length; i++) {
        if (this.media._embedded.metadata[i].id == 'credit_juridique'){
          this.credit.setValue(this.media._embedded.metadata[i].value);
        }
    }
  }

  update(): void {
    this.keepeekService.updateMedia(this.media, this.credit.value).subscribe(any => any);
  }

}
