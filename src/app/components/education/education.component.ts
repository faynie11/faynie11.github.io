import { ChangeDetectionStrategy, Component } from '@angular/core';
import { education } from '../../data/education';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './education.component.html',
})
export class EducationComponent {
  readonly education = education;
}
