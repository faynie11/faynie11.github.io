import { ChangeDetectionStrategy, Component } from '@angular/core';
import { description } from '../../data/description';
import { profile } from '../../data/profile';
import { skills } from '../../data/skills';
import { CopyTextDirective } from '../../shared/copy-text.directive';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [RevealDirective, CopyTextDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about-me.component.html',
})
export class AboutMeComponent {
  readonly description = description;
  readonly profile = profile;
  readonly skills = skills;
  readonly myPhoto = 'assets/my_photo.jpg';
}
