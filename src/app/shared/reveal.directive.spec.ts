import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevealDirective } from './reveal.directive';

@Component({
  standalone: true,
  imports: [RevealDirective],
  template: `<div appReveal id="plain"></div><div [appReveal]="120" id="staggered"></div>`,
})
class HostComponent {}

describe('RevealDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let observed: Element[];
  let trigger: (entries: Partial<IntersectionObserverEntry>[]) => void;

  beforeEach(async () => {
    observed = [];

    // Stub IntersectionObserver so the test drives intersection deterministically.
    spyOn(window, 'IntersectionObserver' as never).and.callFake(function (
      this: unknown,
      callback: IntersectionObserverCallback
    ) {
      trigger = (entries) => callback(entries as IntersectionObserverEntry[], this as never);
      return {
        observe: (el: Element) => observed.push(el),
        unobserve: () => undefined,
        disconnect: () => undefined,
      } as unknown as IntersectionObserver;
    } as never);

    // Force the non-reduced-motion path regardless of the runner's settings.
    spyOn(window, 'matchMedia').and.returnValue({ matches: false } as MediaQueryList);

    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should hide elements and observe them', () => {
    const plain = fixture.nativeElement.querySelector('#plain') as HTMLElement;

    expect(plain.classList).toContain('reveal');
    expect(plain.classList).not.toContain('reveal-visible');
    expect(observed.length).toBe(2);
  });

  it('should apply the stagger delay only when one is given', () => {
    const plain = fixture.nativeElement.querySelector('#plain') as HTMLElement;
    const staggered = fixture.nativeElement.querySelector('#staggered') as HTMLElement;

    expect(staggered.style.transitionDelay).toBe('120ms');
    expect(plain.style.transitionDelay).toBe('');
  });

  it('should reveal an element once it intersects', () => {
    const plain = fixture.nativeElement.querySelector('#plain') as HTMLElement;

    trigger([{ isIntersecting: true, target: plain }]);

    expect(plain.classList).toContain('reveal-visible');
  });

  it('should leave elements hidden while they are off screen', () => {
    const plain = fixture.nativeElement.querySelector('#plain') as HTMLElement;

    trigger([{ isIntersecting: false, target: plain }]);

    expect(plain.classList).not.toContain('reveal-visible');
  });
});
