import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryImage } from '@kolkov/ngx-gallery/lib/ngx-gallery-image';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  member!: Member;
  galleryImages: any;
  constructor(private memberService:MembersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.loadMember();
    this.galleryImages = this.getImages();
  }

  loadMember(){
    let username:string | null = this.route.snapshot.paramMap.get("username");
    if(username){
      this.memberService.getMember(username)
        .subscribe(member => this.member = member);

    }
  }

  getImages() {
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        url: photo?.url,
        description:photo?.url

      });
    }
    return imageUrls;

  }

}
