import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { EducationComponent } from './components/education/education.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MainHeaderComponent,
    NavBarComponent,
    AboutMeComponent,
    EducationComponent,
    ProjectsComponent,
    ContactComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Jakub Wojtycza';
}
