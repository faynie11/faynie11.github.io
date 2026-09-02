import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailDialogComponent } from './email-dialog.component';

describe('EmailDialogComponent', () => {
  let component: EmailDialogComponent;
  let fixture: ComponentFixture<EmailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should require a message before it can be sent', () => {
    expect(component.canSend()).toBeFalse();

    component.message.set('   ');
    expect(component.canSend()).toBeFalse();

    component.message.set('Hello');
    expect(component.canSend()).toBeTrue();
  });

  it('should name the sender in the subject when one is given', () => {
    expect(component.subject()).toBe('Portfolio message');

    component.senderName.set('Ada');
    expect(component.subject()).toBe('Portfolio message from Ada');
  });

  it('should append a reply-to line only when an address is given', () => {
    component.message.set('Hi there');
    expect(component.body()).toBe('Hi there');

    component.senderEmail.set('ada@example.com');
    expect(component.body()).toBe('Hi there\n\nReply to: ada@example.com');
  });

  it('should percent-encode the composed message into both compose URLs', () => {
    component.senderName.set('Ada & Co');
    component.message.set('Line one\nLine two');

    // A raw & or newline here would truncate the subject or body.
    expect(component.mailtoUrl()).toContain('subject=Portfolio%20message%20from%20Ada%20%26%20Co');
    expect(component.mailtoUrl()).toContain('body=Line%20one%0ALine%20two');
    expect(component.gmailUrl()).toContain('su=Portfolio%20message%20from%20Ada%20%26%20Co');
    expect(component.gmailUrl()).toContain('body=Line%20one%0ALine%20two');
  });

  it('should open and close the underlying dialog element', () => {
    const dialog = (fixture.nativeElement as HTMLElement).querySelector('dialog');

    component.open();
    expect(dialog?.hasAttribute('open')).toBeTrue();

    component.close();
    expect(dialog?.hasAttribute('open')).toBeFalse();
  });
});
