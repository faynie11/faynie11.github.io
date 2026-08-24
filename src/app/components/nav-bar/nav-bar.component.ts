import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  linkedinLogo = 'assets/linkedin_logo.svg';
  githubLogo = 'assets/github_logo.svg';

  scrollToEducation() {
    window.scrollTo({ top: 500, behavior: 'smooth' });
  }
  scrollToProjects() {
    window.scrollTo({ top: 1500, behavior: 'smooth' });
  }
  scrollToHome() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openGithub(): void {
  window.open('https://github.com/faynie11', '_blank');
  }

  openLinkedin(): void {
  window.open('https://www.linkedin.com/in/jakub-wojtycza-7a23a825b/', '_blank');
  }
}
