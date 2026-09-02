import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll the matching section into view', () => {
    const section = document.createElement('div');
    section.id = 'projects';
    const spy = spyOn(section, 'scrollIntoView');
    document.body.appendChild(section);

    try {
      component.scrollTo('projects');
      expect(spy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    } finally {
      section.remove();
    }
  });

  it('should not throw when the section is missing', () => {
    expect(() => component.scrollTo('does-not-exist')).not.toThrow();
  });

  it('should close the mobile menu after navigating', () => {
    component.mobileOpen.set(true);
    component.scrollTo('about');
    expect(component.mobileOpen()).toBeFalse();
  });

  it('should mark the last section scrolled past as active', () => {
    // Keep the page away from its bottom so the bottom-of-page rule does not kick in.
    spyOnProperty(document.documentElement, 'scrollHeight').and.returnValue(
      window.innerHeight + window.scrollY + 5000
    );

    const about = document.createElement('div');
    about.id = 'about';
    spyOn(about, 'getBoundingClientRect').and.returnValue({ top: 10 } as DOMRect);
    document.body.appendChild(about);

    try {
      component.updateActiveSection();
      expect(component.activeId()).toBe('about');
    } finally {
      about.remove();
    }
  });

  it('should move the sliding indicator onto the active link', () => {
    spyOnProperty(document.documentElement, 'scrollHeight').and.returnValue(
      window.innerHeight + window.scrollY + 5000
    );

    const projects = document.createElement('div');
    projects.id = 'projects';
    spyOn(projects, 'getBoundingClientRect').and.returnValue({ top: 10 } as DOMRect);
    document.body.appendChild(projects);

    try {
      component.updateActiveSection();
      fixture.detectChanges();

      // Karma renders the fixture at desktop width, so the links are measurable.
      const pill = component.indicator();
      expect(pill).withContext('indicator should be measured').not.toBeNull();
      expect(pill!.width).toBeGreaterThan(0);
    } finally {
      projects.remove();
    }
  });

  it('should activate the last section once the page is scrolled to the bottom', () => {
    spyOnProperty(document.documentElement, 'scrollHeight').and.returnValue(
      window.innerHeight + window.scrollY
    );

    component.updateActiveSection();

    expect(component.activeId()).toBe('contact');
  });
});
