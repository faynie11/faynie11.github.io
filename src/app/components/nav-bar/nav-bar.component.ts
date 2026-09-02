import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChildren,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ThemeService } from '../../core/theme';
import { profile } from '../../data/profile';

interface NavLink {
  id: string;
  label: string;
}

/** Geometry of the pill that slides behind the active desktop link. */
interface Indicator {
  left: number;
  width: number;
}

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent implements OnInit, AfterViewInit {
  private readonly theme = inject(ThemeService);

  @ViewChildren('navBtn') private navButtons?: QueryList<ElementRef<HTMLElement>>;

  readonly profile = profile;
  readonly isDark = computed(() => this.theme.mode() === 'dark');

  readonly links: NavLink[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  /** Section currently under the nav bar, used to highlight the matching link. */
  readonly activeId = signal<string>(this.links[0].id);
  readonly mobileOpen = signal(false);
  readonly indicator = signal<Indicator | null>(null);

  ngOnInit(): void {
    this.updateActiveSection();
  }

  ngAfterViewInit(): void {
    this.updateIndicator();
  }

  toggleTheme(): void {
    this.theme.toggle();
  }

  toggleMobile(): void {
    this.mobileOpen.update((open) => !open);
  }

  scrollTo(sectionId: string): void {
    this.mobileOpen.set(false);
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  @HostListener('window:scroll')
  updateActiveSection(): void {
    // The last section is often shorter than the viewport, so the page runs out
    // of scroll before its top ever reaches the threshold. Treat "scrolled to the
    // bottom" as that section being active.
    const atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

    if (atBottom) {
      this.setActive(this.links[this.links.length - 1].id);
      return;
    }

    // Otherwise a section counts as active once its top passes just below the nav bar.
    const threshold = 80;
    let current = this.links[0].id;

    for (const link of this.links) {
      const top = document.getElementById(link.id)?.getBoundingClientRect().top;
      if (top !== undefined && top <= threshold) {
        current = link.id;
      }
    }

    this.setActive(current);
  }

  /** Highlights a link and slides the pill to match it. */
  private setActive(id: string): void {
    if (this.activeId() === id) return;
    this.activeId.set(id);
    this.updateIndicator();
  }

  /** Measures the active link so the sliding pill can be positioned over it. */
  @HostListener('window:resize')
  updateIndicator(): void {
    const index = this.links.findIndex((link) => link.id === this.activeId());
    const element = this.navButtons?.get(index)?.nativeElement;

    // The desktop links are display:none below md, where offsetWidth reads 0.
    if (!element || element.offsetWidth === 0) {
      this.indicator.set(null);
      return;
    }

    this.indicator.set({ left: element.offsetLeft, width: element.offsetWidth });
  }
}
