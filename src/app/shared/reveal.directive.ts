import {
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';

/**
 * Fades and lifts an element into place the first time it scrolls into view.
 *
 * The hidden state is applied from here rather than from the template, so the
 * content stays visible if this directive never runs. Class toggling happens
 * outside the Angular zone — nothing in the app binds to it, so there is no
 * reason to trigger change detection.
 *
 * Usage: `<div appReveal>` or `<div [appReveal]="120">` to stagger by 120ms.
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  /** Delay in milliseconds, used to stagger neighbouring items. */
  @Input('appReveal') delay: number | string = 0;

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const element = this.host.nativeElement as HTMLElement;

    // Users who asked for less motion get the content immediately.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    // IntersectionObserver is available everywhere this page targets, but a
    // missing implementation must not leave the content hidden forever.
    if (typeof IntersectionObserver === 'undefined') return;

    element.classList.add('reveal');

    const delayMs = Number(this.delay) || 0;
    if (delayMs > 0) {
      element.style.transitionDelay = `${delayMs}ms`;
    }

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add('reveal-visible');
            // Reveal once; re-animating on every pass is distracting.
            this.observer?.unobserve(entry.target);
          }
        },
        // Trigger slightly before the element is fully on screen.
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );

      this.observer.observe(element);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
