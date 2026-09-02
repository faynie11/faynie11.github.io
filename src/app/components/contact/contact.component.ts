import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { profile } from '../../data/profile';
import { CopyTextDirective } from '../../shared/copy-text.directive';
import { RevealDirective } from '../../shared/reveal.directive';
import { EmailDialogComponent } from './email-dialog.component';

interface ContactChannel {
  label: string;
  value: string;
  icon: string;
  /** Copies `value` instead of navigating — an address is more useful on the clipboard. */
  copy?: boolean;
  href?: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RevealDirective, CopyTextDirective, EmailDialogComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  @ViewChild(EmailDialogComponent) private emailDialog?: EmailDialogComponent;

  readonly profile = profile;
  readonly currentYear = new Date().getFullYear();

  /** Shared so the copy button and the link cards stay visually identical. */
  readonly cardClass =
    'group flex flex-col items-center rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:border-brand-300 hover:shadow-md active:scale-[0.98] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-600/50';

  readonly channels: ContactChannel[] = [
    {
      label: 'Email',
      value: profile.email,
      copy: true,
      icon: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6-9.75-6',
    },
    {
      label: 'GitHub',
      value: 'github.com/faynie11',
      href: profile.githubUrl,
      icon: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5',
    },
    {
      label: 'LinkedIn',
      value: 'Jakub Wojtycza',
      href: profile.linkedinUrl,
      icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
    },
  ];

  openEmailDialog(): void {
    this.emailDialog?.open();
  }
}
