import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { description } from '../../data/description'; 
import { education } from '../../data/education';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
 
@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatButtonModule],
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {
  public description = description;
  public education = education;
  my_photo = '/assets/my_photo.jpg';
}
