import { Directive, HostListener, Input, OnDestroy, signal } from '@angular/core';

/**
 * Copies a string to the clipboard on click and flips `copied()` for a moment so
 * the template can confirm it happened.
 *
 * Exported as `appCopy` so the host template can read that state:
 * `<button [appCopy]="email" #copy="appCopy">{{ copy.copied() ? 'Copied!' : email }}</button>`
 *
 * `copied()` only flips when the write actually succeeded — a silent failure that
 * still said "Copied!" would be worse than no feedback at all.
 */
@Directive({
  selector: '[appCopy]',
  standalone: true,
  exportAs: 'appCopy',
})
export class CopyTextDirective implements OnDestroy {
  @Input('appCopy') text = '';

  /** How long the confirmation stays on screen, in milliseconds. */
  @Input() copiedFor = 1600;

  readonly copied = signal(false);

  private timer?: ReturnType<typeof setTimeout>;

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    // The host may be an anchor: copying replaces navigation rather than adding to it.
    event.preventDefault();
    void this.copy();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }

  private async copy(): Promise<void> {
    if (!this.text || !(await this.write(this.text))) return;

    this.copied.set(true);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.copied.set(false), this.copiedFor);
  }

  private async write(text: string): Promise<boolean> {
    // navigator.clipboard needs a secure context, which a file:// preview is not.
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // Permission denied or no secure context — try the legacy path below.
    }

    try {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand('copy');
      area.remove();
      return ok;
    } catch {
      return false;
    }
  }
}
