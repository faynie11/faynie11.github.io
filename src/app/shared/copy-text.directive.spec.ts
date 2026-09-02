import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CopyTextDirective } from './copy-text.directive';

@Component({
  standalone: true,
  imports: [CopyTextDirective],
  template: `
    <button [appCopy]="text" #copy="appCopy" id="btn">
      {{ copy.copied() ? 'Copied!' : text }}
    </button>
  `,
})
class HostComponent {
  text = 'wojtyczakuba@gmail.com';
}

describe('CopyTextDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let button: HTMLElement;
  let written: string[];

  function setUp(writeText: jasmine.Spy): void {
    // navigator.clipboard is read-only, so redefine it for the test.
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('#btn');
  }

  beforeEach(() => {
    written = [];
  });

  it('should copy the bound text and confirm it', fakeAsync(() => {
    setUp(jasmine.createSpy('writeText').and.callFake((t: string) => {
      written.push(t);
      return Promise.resolve();
    }));

    button.click();
    tick();
    fixture.detectChanges();

    expect(written).toEqual(['wojtyczakuba@gmail.com']);
    expect(button.textContent?.trim()).toBe('Copied!');

    tick(1600); // Drain the reset timer so fakeAsync does not fail on a pending queue.
  }));

  it('should stop confirming after the timeout', fakeAsync(() => {
    setUp(jasmine.createSpy('writeText').and.resolveTo());

    button.click();
    tick();
    fixture.detectChanges();
    expect(button.textContent?.trim()).toBe('Copied!');

    tick(1600);
    fixture.detectChanges();
    expect(button.textContent?.trim()).toBe('wojtyczakuba@gmail.com');
  }));

  it('should not claim success when the clipboard write fails', fakeAsync(() => {
    setUp(jasmine.createSpy('writeText').and.rejectWith(new Error('denied')));
    // The legacy fallback must also fail for this to be a true failure path.
    spyOn(document, 'execCommand').and.returnValue(false);

    button.click();
    tick();
    fixture.detectChanges();

    expect(button.textContent?.trim()).toBe('wojtyczakuba@gmail.com');

    tick(1600);
  }));
});
