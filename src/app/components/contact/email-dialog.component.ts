import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  computed,
  signal,
} from '@angular/core';
import { profile } from '../../data/profile';
import { CopyTextDirective } from '../../shared/copy-text.directive';

/**
 * Compose-an-email dialog.
 *
 * This page is served as static files, so there is no backend to POST a form to.
 * The dialog therefore composes the message and hands it to whatever the visitor
 * actually has: their mail app, Gmail in the browser, or the clipboard. Nothing
 * is transmitted from this page — the visitor sends it themselves.
 *
 * Built on the native <dialog> element for the focus trap, Esc-to-close and
 * backdrop that come with it for free.
 */
@Component({
  selector: 'app-email-dialog',
  standalone: true,
  imports: [CopyTextDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './email-dialog.component.html',
})
export class EmailDialogComponent {
  @ViewChild('dialog') private dialog?: ElementRef<HTMLDialogElement>;

  readonly profile = profile;

  readonly senderName = signal('');
  readonly senderEmail = signal('');
  readonly message = signal('');

  /** A message with no body is not worth handing off to a mail client. */
  readonly canSend = computed(() => this.message().trim().length > 0);

  readonly subject = computed(() => {
    const who = this.senderName().trim();
    return who ? `Portfolio message from ${who}` : 'Portfolio message';
  });

  readonly body = computed(() => {
    const parts = [this.message().trim()];
    const replyTo = this.senderEmail().trim();
    if (replyTo) {
      parts.push('', `Reply to: ${replyTo}`);
    }
    return parts.join('\n');
  });

  readonly mailtoUrl = computed(
    () =>
      `mailto:${profile.email}` +
      `?subject=${encodeURIComponent(this.subject())}` +
      `&body=${encodeURIComponent(this.body())}`
  );

  /** Browser compose window, for visitors with no mail app registered. */
  readonly gmailUrl = computed(
    () =>
      'https://mail.google.com/mail/?view=cm&fs=1' +
      `&to=${encodeURIComponent(profile.email)}` +
      `&su=${encodeURIComponent(this.subject())}` +
      `&body=${encodeURIComponent(this.body())}`
  );

  open(): void {
    this.dialog?.nativeElement.showModal();
  }

  close(): void {
    this.dialog?.nativeElement.close();
  }
}
