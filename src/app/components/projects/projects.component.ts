import { ChangeDetectionStrategy, Component } from '@angular/core';
import { projects } from '../../data/projects';
import { profile } from '../../data/profile';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
  readonly projects = projects;
  readonly profile = profile;
}
