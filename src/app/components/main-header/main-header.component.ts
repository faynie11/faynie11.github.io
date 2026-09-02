import { ChangeDetectionStrategy, Component } from '@angular/core';
import { profile } from '../../data/profile';

@Component({
  selector: 'app-main-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main-header.component.html',
})
export class MainHeaderComponent {
  readonly profile = profile;
  readonly background = 'assets/bg_website.png';

  scrollTo(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
